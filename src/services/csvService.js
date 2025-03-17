const fs = require('fs');
const csv = require('csv-parser');
const db = require("../../db/db");
const { convertDate } = require('../utils/convertDate');
const { validateCsvFilenameFormat, getCsvUploadId, deleteCsvFile } = require('../utils/csvUtils');
csvRepository = require('../repositories/csvRepository');

const processCsvRow = async (row, csvUploadId, trx, results) => {
  try {
    const jobGroupId = row['job group'].trim();
    const employeeId = parseInt(row['employee id'], 10);
    const hoursWorked = parseFloat(row['hours worked']);
    const date = convertDate(row['date']);

    // Insert employee if not found
    await csvRepository.insertEmployeeIfNotExists(employeeId, jobGroupId, trx);

    // Prepare the result to insert into pay_entries
    results.push({
      date,
      hours: hoursWorked,
      employee_id: employeeId,
      csv_upload_id: csvUploadId,
    });
  } catch (error) {
    console.error('Error processing row:', error);
    throw error;
  }
};

const parseCSV = async (file) => {
  return new Promise(async (resolve, reject) => {
    const validCsvFilenameFormat = validateCsvFilenameFormat(file.filename);
    if (!validCsvFilenameFormat) {
      await deleteCsvFile(file.path);
      return reject(new Error('Invalid filename format. Expected format: time-report-x.csv'));
    }

    const csvUploadId = getCsvUploadId(file.filename);

    // Check if the CSV upload already exists in the database
    const existingCSV = await csvRepository.checkIfCsvExists(csvUploadId);
    if (existingCSV) {
      await deleteCsvFile(file.path);
      return reject(new Error(`CSV upload ${file.filename} already exists in the database.`));
    }

    const results = [];
    const trx = await db.transaction();

    try {
      await csvRepository.insertCsvUpload(csvUploadId, file.filename, trx);

      const fileStream = fs.createReadStream(file.path).pipe(csv());
      const rowPromises = [];

      fileStream.on('data', (row) => {
        rowPromises.push(processCsvRow(row, csvUploadId, trx, results));
      });

      fileStream.on('end', async () => {
        try {
          await Promise.all(rowPromises);

          if (results.length > 0) {
            await csvRepository.insertPayEntries(results, trx);
          }

          await trx.commit();
          await deleteCsvFile(file.path);
          resolve({ message: 'CSV Successfully parsed!' });
        } catch (error) {
          console.error('Error inserting pay entries:', error);
          await trx.rollback();
          reject(error);
        }
      });

      fileStream.on('error', async (error) => {
        console.error('Error reading CSV:', error);
        await trx.rollback();
        reject(error);
      });
    } catch (error) {
      console.error('Error during transaction:', error);
      await trx.rollback();
      await deleteCsvFile(file.path);
      reject(error);
    }
  });
};

module.exports = { parseCSV };
