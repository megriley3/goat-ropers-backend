const router = require("express").Router();
const controller = require("./tournaments.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:eventId").post(controller.create).all(methodNotAllowed);

module.exports = router;