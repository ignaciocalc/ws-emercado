const prodModel = require("../models/prodModels.js");

async function getProduct(req, res){
    const product = await prodModel.getProduct(req.params.productId);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(product)
}


module.exports = {
    getProduct,

}