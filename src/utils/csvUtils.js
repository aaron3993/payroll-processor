const path = require('path');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const matchFilenameRegex = (filename) => filename.match(/^time-report-(\d+)$/);

const validateCsvFilenameFormat = (filename) => {
  const match = matchFilenameRegex(filename)
  return match ? true : false;
};

const getCsvUploadId = (filename) => {
  const match = matchFilenameRegex(filename)
  return match ? parseInt(match[1], 10) : null;
};

const deleteCsvFile = async (filePath) => {
  try {
    await unlinkFile(filePath);
  } catch (error) {
    console.error(`Error deleting file ${filePath}:`, error);
  }
};

module.exports = { validateCsvFilenameFormat, getCsvUploadId, deleteCsvFile };