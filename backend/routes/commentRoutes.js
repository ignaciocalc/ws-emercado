const express = require("express");
const commentControllers = require("../controllers/commentControllers.js");

const commentRouter = express.Router();
// DENTRO DE COMMENTS
// => cats/cat |  
//             v
commentRouter.get("/:productId", commentControllers.getComments);

module.exports = commentRouter 