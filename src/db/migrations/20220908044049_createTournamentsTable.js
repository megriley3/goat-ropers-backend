/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("tournaments", (table) => {
    table.increments("tournament_id").primary();
    table.string("tournament_name").notNullable();
    table.string("tournament_date").notNullable();
    table.time("start_time").notNullable();
    table.time("checkin_time").notNullable();
    table.string("level").notNullable();
    table.string("gender").notNullable();
    table.string("format").notNullable();
    table.string("type").notNullable();
    table.integer("team_size").notNullable();
    table.integer("subs");
    table.integer("event_id").unsigned().notNullable();
    table.foreign("event_id").references("event_id").inTable("events").onDelete("cascade")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("tournaments")
};
