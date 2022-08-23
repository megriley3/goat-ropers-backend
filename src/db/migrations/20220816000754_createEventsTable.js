/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("events", (table)=>{
    table.increments("event_id").primary();
    table.string("event_name").notNullable();
    table.string("start_date").notNullable();
    table.string("end_date");
    table.boolean("finished").defaultTo(false);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("events")
};
