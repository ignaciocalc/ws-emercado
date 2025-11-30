const mariadb = require("mariadb");
const pool = mariadb.createPool({host: "localhost", user: "root", password: "Ceibal", database: "emercado", connectionLimit: 5});

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

async function setCart(cart, user_id){
    let conn;
    try {
        conn = await pool.getConnection();

        const carritoACt = await conn.query("UPDATE carts SET currency=?, cantProduct=?, shipmentType=?, products=? WHERE id_user=?", 
            [cart.moneda, cart.cantProductos, cart.tipoEnvio, JSON.stringify(cart.productos), user_id]
        )

        return true
    }
    finally {
        if(conn)
            conn.release()
    }

    return false
}

async function getCart(user_id){
    let conn;
    try {
        conn = await pool.getConnection();

        let cart = await conn.query("SELECT currency, cantProduct, shipmentType, products FROM carts WHERE id_user=?", [user_id]);

        return cart[0]
    } finally {
        if (conn)
          conn.release()
    }
    return false
}

module.exports = {
    setCart,
    getCart
}