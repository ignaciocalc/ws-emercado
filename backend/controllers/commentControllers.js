const commentModels = require("../models/commentModels.js");

async function getComments(req, res){
    const comment = await commentModels.getComments(req.params.productId);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(comment);
}

module.exports = {
    getComments,
}