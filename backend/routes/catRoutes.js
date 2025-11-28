const express = require("express");
const catControllers = require("../controllers/catControllers.js");

const catRouter = express.Router();
// DENTRO DE CATS
// => cats/cat |  
//             v
catRouter.get("/cat", catControllers.getCategories);

catRouter.get("/:productId", catControllers.getCatProducts)

module.exports = catRouter 