const mariadb = require("mariadb");
const pool = mariadb.createPool({host: "localhost", user: "root", password: "Ceibal", database: "emercado", conectionLimits: 5});

async function getCategories(){
   let conn
   try {
      conn = await pool.getConnection();

      let data = await conn.query("SELECT id, name, description, productCount, imgID FROM categories");

      for (let element of data) {
         const imgData = await conn.query("SELECT ruta FROM images WHERE id=?", [element.imgID]);
         element.imgID = undefined;
         element.imgSrc = imgData[0].ruta;
      }

      return(data)

   } finally {
      if (conn)
         conn.release()
   }
   return false
}


async function getCatProducts(id) {
   
   let conn; 
   try  {
      conn = await pool.getConnection();
      

      // (1) necesito el id    -> req.params.productId
      // (2) necesito catName  -> en la tabla de categories con el id
      // (3) necesito products -> en la tabla de productos con catName 
      // (4) necesito las imgs -> en la tabla de imágenes con id_product

      // (2)
      const catName = await conn.query("SELECT name FROM categories WHERE id=?", [id]);
      // (3)
      let products  = await conn.query("SELECT id, name, description, cost, currency, soldCount FROM products WHERE category=?", [catName[0].name]);
      
      for(let item of products){
         item.category        = undefined;
         item.relatedProducts = undefined;   
         // (4)
         let imgProd = await conn.query("SELECT ruta FROM images WHERE id_product=? LIMIT 1", [item.id]);
         item.image = imgProd[0].ruta;
      }

      let resObj  =  {};
      
      resObj.catID    = id;
      resObj.catName  = catName[0].name;
      resObj.products = products;
      
      return (resObj)

   } finally {
      if (conn)
         conn.release()
   }
}

module.exports = {
   getCategories,
   getCatProducts,
}