const mariadb = require("mariadb");
const pool = mariadb.createPool({host: "localhost", user: "root", password: "Ceibal", database: "emercado", connectionLimit: 5});

/* 
    HEADER
        access-token: 
    BODY 
        userId
        cart = {
                    cantProductos: 2,
                    moneda: "UYU",
                    productos: [{idProducto, nombre, costo, moneda, cantidad}]
                    tipoEnvio: 
                }
            
*/


async function setCart(cart, user_id){
    console.log("llego")
    let conn;
    try {
        conn = await pool.getConnection();

        await conn.query("UPDATE carts SET currency=?, cantProduct=?, shipmentType=?, products=? WHERE id_user=?", 
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



module.exports = {
    setCart,
}