const express = require("express");
const cartControllers = require("../controllers/cartControllers.js");

const cartRouter = express.Router();


cartRouter.put("/:idUser", cartControllers.setCart);
cartRouter.get("/:idUser", cartControllers.getCart);
// cartRouter.post("/:idUser", cartControllers.createCart); NOOOO

module.exports = cartRouter