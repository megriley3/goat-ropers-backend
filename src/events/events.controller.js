const eventsService = require("./events.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next){
    const data = await eventsService.list();
    return res.json({data});
}

function bodyHasProperty(property){
    return function(req, res, next){
        const {data = {}} = req.body;
        if(data[property]) {
            return next();
        } else {
            next({ status: 400, message: `Must include a ${property}` });
        }
    }
}

function futureEvent(req, res, next){
    let {start_date} = req.body.data;
    start_date = new Date(start_date)
    const today = new Date();
    if(start_date.getTime()<today.getTime()){
        next({status: 400, message: `Start date must be in the future.`})
    } else {
        res.locals.start_date = start_date;
        next();
    }
}

function validEndDate(req, res, next){
    let {end_date} = req.body.data;
    if(end_date){
        const {start_date} = res.locals;
        end_date = new Date(end_date);
        if(end_date.getTime()<start_date.getTime()){
            return next({status: 400, message: `End date must be after the start date. End date is not required for one day events.`})
        } else {
            res.locals.end_date = end_date;
            next();
        }
    }
    next();
}

async function create(req, res, next){
    const newEvent = req.body.data;
    const data = await eventsService.create(newEvent);
    res.status(201).json({data});
}

//had validity checks for update and delete

/*async function eventExists(req, res, next){

  }*/

async function update(req, res, next){
    const updatedEvent = req.body.data;
    const data = await eventsService.update(updatedEvent);
    res.status(200).json({data});
}

async function deleteEvent(req, res, next){
    const eventId = req.body.data;
    await eventsService.delete(eventId);
    res.sendStatus(204)
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: [bodyHasProperty("event_name"), bodyHasProperty("start_date"), futureEvent, validEndDate, asyncErrorBoundary(create)],
    update: asyncErrorBoundary(update),
    delete: asyncErrorBoundary(deleteEvent)
}