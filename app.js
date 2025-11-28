// importacion de express y definicion de puerto
const express        = require("express");
const catControllers = require("./backend/controllers/catControllers.js")
// const prodControllers= require("./backend/controllers/prodControllers.js")
const app    = express();
const puerto = 3000;

// conexion con base de datos
const mariadb = require("mariadb");
const pool    = mariadb.createPool({host: "lolhost", user: "root", password: "Ceibal", database: "emercado", conectionLimits: 5});

const catRouter     = require("./backend/routes/catRoutes.js");
const prodRouter    = require("./backend/routes/prodRoutes.js");
const commentRouter = require("./backend/routes/commentRoutes.js");

app.use("/cats", catRouter)
app.use("/products", prodRouter)
app.use("/cats_products", catRouter)
app.use("/products_comments", commentRouter)



/////////////////////////////////
// MI ESPACIO NO TOQUEN GIES ///
// /cats_products/101
// app.get("/cats_products/:productId", async (req, res) => {
   
//    let conn; 
//    try  {
//       conn   = await pool.getConnection();
//       let id = req.params.productId;
      

//       // (1) necesito el id    -> req.params.productId
//       // (2) necesito catName  -> en la tabla de categories con el id
//       // (3) necesito products -> en la tabla de productos con catName 
//       // (4) necesito las imgs -> en la tabla de imágenes con id_product

//       // (2)
//       const catName = await conn.query("SELECT name FROM categories WHERE id=?", [id]);
//       // (3)
//       let products  = await conn.query("SELECT id, name, description, cost, currency, soldCount FROM products WHERE category=?", [catName[0].name]);
      
//       for(let item of products){
//          item.category        = undefined;
//          item.relatedProducts = undefined;   
//          // (4)
//          let imgProd = await conn.query("SELECT ruta FROM images WHERE id_product=? LIMIT 1", [item.id]);
//          item.image = imgProd[0].ruta;
//       }

//       let resObj  =  {};
      
//       resObj.catID    = id;
//       resObj.catName  = catName[0].name;
//       resObj.products = products;

//       res.setHeader("Access-Control-Allow-Origin", "*");
//       res.json(resObj);      

//    } catch(error) {
//       res.status(404).json({message: "Hubo un error en el servidor"})
//    } 
//    finally {
//       if (conn)
//          conn.release()
//    }
   

   
// });






// /////////////////////////////////







// app.get("/products_comments/:productId", async (req, res) => {
//    // let conn;
   
//    // try {
//    //    conn = await pool.getConnection();
//    //    const productID = req.params.productId;
      
//    //    let data = await conn.query(
//    //       "SELECT product_Id, score, description, user, dateTime FROM comments WHERE product_Id =?",
//    //       [productID]
//    //    );

//    //    for(let item of data){
//    //       let product     = item.product_Id;
//    //       item.product_Id = undefined;
//    //       item.product    = product;
//    //    }
            
//    //    res.setHeader("Access-Control-Allow-Origin", "*");
//    //    res.json(data)
//    // }
//    // catch(error) {
//    //    res.status(404).json({ message: "Hubo un error en el servidor"});
     
//    // }
//    // finally {
//    //    if (conn)
//    //       conn.release();
//    // } 

// }); 










//////////////////////////////////////////////////

// listeneeer
app.listen(puerto, function(error){
   if (error)
      console.log("Error al iniciar server")
   else
      console.log("Bienvenido! Escuchando en el puerto " + puerto)
})
