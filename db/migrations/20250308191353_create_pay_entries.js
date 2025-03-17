/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('pay_entries', function (table) {
    table.increments('id').primary();
    table.date('date').notNullable();
    table.float('hours').notNullable();
    table.integer('csv_upload_id').references('id').inTable('csv_uploads').onDelete('CASCADE');
    table.integer('employee_id').references('id').inTable('employees').onDelete('CASCADE');
  });
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('pay_entries');
};