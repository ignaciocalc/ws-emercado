const express = require("express");
const usersControllers = require("../controllers/usersControllers.js");

const usersRouter = express.Router();

usersRouter.post("/login", usersControllers.validUser);

module.exports = usersRouter;