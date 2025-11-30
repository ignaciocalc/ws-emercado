// importacion de express y definicion de puerto
const express = require("express");
const catRouter     = require("./backend/routes/catRoutes.js");
const prodRouter    = require("./backend/routes/prodRoutes.js");
const commentRouter = require("./backend/routes/commentRoutes.js");
const userRouter    = require("./backend/routes/usersRoutes.js");
const cartRouter    = require("./backend/routes/cartRoutes.js");
const jwt = require("jsonwebtoken");
const app    = express();
const puerto = 3000;
const SECRET_KEY = "GRUPO6 SECRETKEY";

// Middleware para leer JSON
app.use(express.json());

// Middleware para setear headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Middleware para verificar clave al consultar o actualizar informacion carrito
app.use("/cart", (req, res, next) => {

   if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

   const token = req.headers["authorization"];

   jwt.verify(token, SECRET_KEY, async (err) => {
         if(err){
            res.status(401).json({message: "No se puede validar el token del usuario"})
         } else {
            next();   
         }
      }) 
});

app.use("/cats", catRouter)
app.use("/products", prodRouter)
app.use("/cats_products", catRouter)
app.use("/products_comments", commentRouter)
app.use("", userRouter)
app.use("/cart", cartRouter)

// listener
app.listen(puerto, function(error){
   if (error)
      console.log("Error al iniciar server")
   else
      console.log("Bienvenido/a! Escuchando en el puerto " + puerto)
})
