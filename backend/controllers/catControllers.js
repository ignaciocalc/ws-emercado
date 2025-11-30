const catModel = require("../models/catModels.js");


async function getCategories(req, res) {
      const categories = await catModel.getCategories()
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.json(categories)
}

async function getCatProducts(req, res) {
      const catProducts = await catModel.getCatProducts(req.params.productId)
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.json(catProducts);      
};


module.exports = {
   getCategories,
   getCatProducts,
}