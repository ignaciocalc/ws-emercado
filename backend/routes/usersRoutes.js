const express = require("express");
const usersControllers = require("../controllers/usersControllers.js");

const usersRouter = express.Router();

usersRouter.post("/login", usersControllers.validUser);

usersRouter.post("/register", usersControllers.createUserAndCart); 

module.exports = usersRouter;