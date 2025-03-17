const request = require('supertest');
const { app } = require('../../app');
const path = require('path');
const db = require('../../../db/db');
const csvRepository = require("../../repositories/csvRepository")

describe('/api/csv', () => {
  beforeAll(async () => {
    await db('pay_entries').del();
    await db('employees').del(); 
    await db('csv_uploads').del();
  });

  it('should upload and process the CSV file via API', async () => {
  const testCsvPath = path.join(__dirname, '../../../time-report-42.csv');
  
    const response = await request(app)
      .post('/api/csv') 
      .attach('csv', testCsvPath, 'time-report-42.csv');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('CSV Successfully parsed!');

    const csvExists = await csvRepository.checkIfCsvExists(42)
    expect(csvExists).toBe(true)
  });
});
