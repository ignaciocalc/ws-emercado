const express = require("express");
const cartControllers = require("../controllers/cartControllers.js");

const cartRouter = express.Router();


cartRouter.put("/cart", cartControllers.setCart);

module.exports = cartRouter