/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .table('pay_entries', (table) => {
    table.index('employee_id');
  })
  .table('employees', (table) => {
    table.index('id');
    table.index('job_group_id');
  })
  .table('job_groups', (table) => {
    table.index('id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .table('pay_entries', (table) => {
    table.dropIndex('employee_id');
  })
  .table('employees', (table) => {
    table.dropIndex('id');
    table.dropIndex('job_group_id');
  })
  .table('job_groups', (table) => {
    table.dropIndex('id');
  });
};
