const cartModel  = require("../models/cartModels.js");
const SECRET_KEY = "GRUPO6 SECRETKEY";
const jwt = require("jsonwebtoken");


/* 
    HEADER
        access-token
        req.headers["access-token"]
        
    BODY
    {
        userId
        cart = {
            cantProductos: 2,
            moneda: "UYU",
            productos: [{idProducto, nombre, costo, moneda, cantidad}],
            tipoEnvios
        }
    
    }
    
*/

async function setCart(req, res){
    console.log("llego")
    const token = req.headers["access-token"];
    jwt.verify(token, SECRET_KEY, async (err) => {
        if(err){
            res.status(401).json({message: "No esta autorizado para actualizar el carrito"})
        } else {
            const cart = await cartModel.setCart(req.body.cart, req.body.userId);
            if (cart) {
                res.status(201).json({message: "Carrito actualizado"})
            } else {
                res.status(404).json({message: "Hubo un error al actualizar el carrito"})
            }     
        }
    })    
}

module.exports = {
    setCart
}