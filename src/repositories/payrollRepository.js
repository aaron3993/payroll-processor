const db = require('../../db/db');

class PayrollRepository {
  async getPayrollData() {
    return db('pay_entries')
      .join('employees', 'pay_entries.employee_id', 'employees.id')
      .join('job_groups', 'employees.job_group_id', 'job_groups.id')
      .select(
        'pay_entries.employee_id',
        'pay_entries.date',
        'pay_entries.hours',
        'job_groups.pay_rate'
      );
  }
}

module.exports = new PayrollRepository();