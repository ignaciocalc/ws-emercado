const express = require("express");
const prodControllers = require("../controllers/prodControllers.js");

const prodRouter = express.Router();


prodRouter.get("/:productId", prodControllers.getProduct)

module.exports = prodRouter;