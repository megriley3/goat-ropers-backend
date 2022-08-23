const events = require("./00-events.json");

exports.seed = function(knex) {
  return knex
    .raw("TRUNCATE TABLE events RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("events").insert(events);
    });
};