const knex = require("../db/connection");

function create(newTournament){
    return knex("tournaments").insert(newTournament).returning("*").then((createdTournament) => createdTournament[0]);
}

module.exports = {
    create
}