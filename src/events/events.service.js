const knex = require("../db/connection");

function list(){
    return knex("events").select("*").orderBy("start_date")
}

function create(newEvent){
    return knex("events").insert(newEvent).returning("*").then((createdEvent) => createdEvent[0])
}
module.exports = {
    list,
    create
}