/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('job_groups').del()
    .then(function () {
      return knex('job_groups').insert([
        { id: 'A', pay_rate: 20 },
        { id: 'B', pay_rate: 30 }
      ]);
    });
};
