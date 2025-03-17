const payrollRepository = require('../repositories/payrollRepository');
const { buildPayrollReport } = require('../utils/payrollUtils');

const getPayrollReportData = async () => {
  const payEntries = await payrollRepository.getPayrollData()
  const payrollReport = buildPayrollReport(payEntries);
  return payrollReport;
};

module.exports = { getPayrollReportData };