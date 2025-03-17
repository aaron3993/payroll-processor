const { getPayrollReportData } = require('../services/payrollService')

const getPayrollReport = async (req, res) => {
  try {
    const payrollReport = await getPayrollReportData();
    res.status(200).json({ payrollReport });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message});
  }
}

module.exports = { getPayrollReport };