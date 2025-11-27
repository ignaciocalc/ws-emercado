// importacion de express y definicion de puerto
const express = require("express");
const app = express();
const puerto = 3000;

// conexion con base de datos
const mariadb = require("mariadb");
const pool = mariadb.createPool({host: "localhost", user: "root", password: "Ceibal", database: "emercado", conectionLimits: 5});

app.get("/cats/cat.json", async (req, res) => {
   let conn
   try {
      conn = await pool.getConnection();

      let data = await conn.query("SELECT id, name, description, productCount, imgID FROM categories");

      for (let element of data) {
         const imgData = await conn.query("SELECT ruta FROM images WHERE id=?", [element.imgID]);
         console.log(imgData)
         element.imgID = undefined;
         element.imgSrc = imgData[0].ruta;
      }

      res.json(data)

   } catch(error) {
      res.status(404).json({message: "Hubo un error en el servidor"})
   } finally {
      if (conn)
         conn.release()
   }
})

/////////////////////////////////
// Implementacion nacho ///
app.get("/products/:productId", async (req, res) => {
   let conn;
   try {
      // traer id de los parametros
      const productId = req.params.productId;
      
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
         productRelatedName = await conn.query("SELECT name FROM products WHERE id=?", [productRelId]);
         productRelImg = await conn.query("SELECT ruta FROM images WHERE id_product=? LIMIT 1", [productRelId]);
         productRelated.push({id: productRelId, name: productRelatedName[0].name, image: productRelImg[0].ruta})
      }

      // se genera arrelgo con la ruta de las imagenes
      for (let productImgRuta of productImg){
         productImgRutas.push(productImgRuta.ruta)
      }


      productInfo[0].images = productImgRutas;
      productInfo[0].relatedProducts = productRelated;
      
      res.json(productInfo[0])

   } catch(error) {
      res.status(404).json({message: "Hubo un error en el servidor"})
   } finally {
      if (conn)
         conn.release()
   }
})









/////////////////////////////////
// MI ESPACIO NO TOQUEN GIES ///
// /cats_products/101
app.get("/cats_products/:productId", async (req, res) => {
   
   let conn; 
   try  {
      conn   = await pool.getConnection();
      let id = req.params.productId;
      

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

      res.json(resObj);      

   } catch(error) {
      res.status(404).json({message: "Hubo un error en el servidor"})
   } 
   finally {
      if (conn)
         conn.release()
   }
   

   
});






/////////////////////////////////







app.get("/products_comments/:productId", async (req, res) => {
   let conn;
   
   try {
      conn = await pool.getConnection();
      const productID = req.params.productId;
      
      let data = await conn.query(
         "SELECT product_Id, score, description, user, dateTime FROM comments WHERE product_Id =?",
         [productID]
      );

      for(let item of data){
         let product     = item.product_Id;
         item.product_Id = undefined;
         item.product    = product;
      }
            
      res.json(data)
   }
   catch(error) {
      res.status(404).json({ message: "Hubo un error en el servidor"});
     
   }
   finally {
      if (conn)
         conn.release();
   } 

}); 










//////////////////////////////////////////////////

// listeneeer
app.listen(puerto, function(error){
   if (error)
      console.log("Error al iniciar server")
   else
      console.log("Escuchando en el puerto" + puerto)
})
