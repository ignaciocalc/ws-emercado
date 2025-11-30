
const mariadb = require("mariadb");
const pool = mariadb.createPool({host: "localhost", user: "root", password: "Ceibal", database: "emercado", conectionLimit: 5});


async function getProduct(productId){
    let conn;
    try {
        
        conn = await pool.getConnection();
        // traer producto
        const productInfo = await conn.query("SELECT id, name, description, cost, currency, soldCount, category, relatedProducts FROM products WHERE id=?", [productId]);

        // traer imagenes con el id de ese producto
        const productImg = await conn.query("SELECT ruta FROM images WHERE id_product=?", [productId])
        
        
        let 
            productRelated = [],
            productImgRutas = [];

        // traer los id, name, imagenes de los produtos relacionados 
        for (let productRelId of productInfo[0].relatedProducts) {
            let productRelatedName = await conn.query("SELECT name FROM products WHERE id=?", [productRelId]);
            let productRelImg = await conn.query("SELECT ruta FROM images WHERE id_product=? LIMIT 1", [productRelId]);
            productRelated.push({id: productRelId, name: productRelatedName[0].name, image: productRelImg[0].ruta})
        }

        // se genera arrelgo con la ruta de las imagenes
        for (let productImgRuta of productImg){
            productImgRutas.push(productImgRuta.ruta)
        }


        productInfo[0].images          = productImgRutas;
        productInfo[0].relatedProducts = productRelated;
        
        return (productInfo[0])

    } finally {
        if (conn)
            conn.release()
    }
    return false
}

module.exports = {
    getProduct, 
}