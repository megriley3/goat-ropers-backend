const tournamentsService = require("./tournaments.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function create(req, res, next){
    const newTournament = req.body.data;
    const data = await tournamentsService.create(newTournament);
    res.status(201).json({data});
}

module.exports = {
    create: asyncErrorBoundary(create),
}