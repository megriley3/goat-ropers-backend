const router = require("express").Router();
const controller = require("./events.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).post(controller.create).put(controller.update).delete(controller.delete).all(methodNotAllowed);

module.exports = router;