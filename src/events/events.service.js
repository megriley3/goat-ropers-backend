const knex = require("../db/connection");

function list(){
    return knex("events").select("*").orderBy("start_date")
}

function create(newEvent){
    return knex("events").insert(newEvent).returning("*").then((createdEvent) => createdEvent[0])
}

function update(updatedEvent){
    return knex("events")
        .select("*")
        .where({event_id: updatedEvent.event_id})
        .update(updatedEvent, "*")
        .then((event) => event[0])
}

function destroy(eventId){
    return knex("events").where({event_id: eventId}).del();
}

module.exports = {
    list,
    create,
    update,
    delete: destroy
}