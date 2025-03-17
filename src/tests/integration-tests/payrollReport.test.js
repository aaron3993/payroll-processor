const request = require('supertest');
const { app } = require('../../app');
const db = require('../../../db/db');

describe('/api/payroll', () => {
  it('should return a payroll report with correct structure when there are pay entries', async () => {
    const payEntries = await db('pay_entries').select();

    if (payEntries.length === 0) {
      console.log('No pay entries found in the database, skipping this test.');
      return;
    }

    const response = await request(app).get('/api/payroll');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('payrollReport');
    expect(response.body.payrollReport).toHaveProperty('employeeReports');
    expect(Array.isArray(response.body.payrollReport.employeeReports)).toBe(true);

    const firstEntry = response.body.payrollReport.employeeReports[0];
    expect(firstEntry).toHaveProperty('employeeId');
    expect(typeof firstEntry.employeeId).toBe('number');

    expect(firstEntry).toHaveProperty('payPeriod');
    expect(firstEntry.payPeriod).toHaveProperty('startDate');
    expect(firstEntry.payPeriod).toHaveProperty('endDate');
    expect(typeof firstEntry.payPeriod.startDate).toBe('string');
    expect(typeof firstEntry.payPeriod.endDate).toBe('string');

    expect(firstEntry).toHaveProperty('amountPaid');
    expect(typeof firstEntry.amountPaid).toBe('number');
  });

  it('should return an empty payroll report when there are no pay entries', async () => {
    const payEntries = await db('pay_entries').select();

    if (payEntries.length > 0) {
      console.log('Pay entries exist in the database, skipping this test.');
      return;
    }

    const response = await request(app).get('/api/payroll');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('payrollReport');
    expect(response.body.payrollReport).toHaveProperty('employeeReports');
    expect(Array.isArray(response.body.payrollReport.employeeReports)).toBe(true);
    expect(response.body.payrollReport.employeeReports.length).toBe(0);
  });
});
