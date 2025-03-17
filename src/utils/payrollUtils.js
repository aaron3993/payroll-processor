const buildPayrollReport = (payEntries) => {
  const report = {};

  payEntries.forEach(({ employee_id, date, hours, pay_rate }) => {
    // Create pay period start and end dates
    const payPeriodStart =
      date.getDate() <= 15
        ? new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split('T')[0]
        : new Date(date.getFullYear(), date.getMonth(), 16).toISOString().split('T')[0];
    const payPeriodEnd =
      date.getDate() <= 15
        ? new Date(date.getFullYear(), date.getMonth(), 15).toISOString().split('T')[0]
        : new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split('T')[0];

    // Create a key for each pay period
    const payPeriodKey = `${payPeriodStart} - ${payPeriodEnd}`;

    // Create object to store employee pay details
    if (!report[employee_id]) {
      report[employee_id] = {};
    }

    // Create pay period objects for each employee
    if (!report[employee_id][payPeriodKey]) {
      report[employee_id][payPeriodKey] = {
        employeeId: employee_id,
        payPeriod: { startDate: payPeriodStart, endDate: payPeriodEnd },
        amountPaid: 0,
      };
    }

    // Calculate employee pay for date range
    report[employee_id][payPeriodKey].amountPaid += hours * pay_rate;
  });

  // Extract all values from the report object
  const reportValuesArray = Object.values(report);

  // Extract the values of each pay period into arrays and flatten them to return desired output stucture as a single array of employee pay objects
  const employeeReports = reportValuesArray.flatMap((payPeriodReport) => Object.values(payPeriodReport));

  // Sort by employees, then pay period start date
  return {
    employeeReports: employeeReports.sort((a, b) => {
      if (a.employeeId !== b.employeeId) {
        return a.employeeId - b.employeeId; // Sort employees numerically
      }
      return new Date(a.payPeriod.startDate) - new Date(b.payPeriod.startDate); // Sort pay periods chronologically
    }),
  };
};

module.exports = { buildPayrollReport };