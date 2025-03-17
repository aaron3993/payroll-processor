const db = require('../../db/db');

class CsvRepository {
  async getCsvById(uploadId) {
    return db('csv_uploads').where({ id: uploadId }).first();
  }

  async checkIfCsvExists(uploadId) {
    const csv = await this.getCsvById(uploadId)
    return csv ? true : false
  }

  async insertCsvUpload(uploadId, fileName) {
    return db('csv_uploads').insert({
      id: uploadId,
      name: fileName,
    });
  }

  async checkIfJobGroupExists(jobGroupId) {
    return db('job_groups').where({ id: jobGroupId }).first();
  }

  async insertEmployeeIfNotExists(employeeId, jobGroupId) {
    const jobGroup = await this.checkIfJobGroupExists(jobGroupId);

    if (!jobGroup) {
      throw new Error(`Job group with ID ${jobGroupId} does not exist.`);
    }

    return db('employees')
      .insert({ id: employeeId, job_group_id: jobGroupId })
      .onConflict('id') // Prevent insertion if employee already exists
      .ignore();
  }

  async insertPayEntries(payEntries) {
    return db('pay_entries').insert(payEntries);
  }
}

module.exports = new CsvRepository();
