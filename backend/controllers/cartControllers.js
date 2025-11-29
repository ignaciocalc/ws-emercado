    const cartModel  = require("../models/cartModels.js");

    /* 
        HEADER
            authorization : token
            
        BODY
            cart = {
                cantProductos: 2,
                moneda: "UYU",
                productos: [{idProducto, nombre, costo, moneda, cantidad}],
                tipoEnvios
            }
    */

    async function setCart(req, res){

        const cart = await cartModel.setCart(req.body, req.params.idUser);

            if (cart) {
                res.status(201).json({message: "Carrito actualizado"})
            } else {
                res.status(404).json({message: "Hubo un error al actualizar el carrito"})
            }    
    }

    module.exports = {
        setCart
    }