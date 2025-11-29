const express = require("express");
const cartControllers = require("../controllers/cartControllers.js");

const cartRouter = express.Router();


cartRouter.put("/:idUser", cartControllers.setCart);

module.exports = cartRouter