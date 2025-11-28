// importacion de express y definicion de puerto
const express        = require("express");
const app    = express();
const puerto = 3000;

// Middleware para leer JSON
app.use(express.json());

const catRouter     = require("./backend/routes/catRoutes.js");
const prodRouter    = require("./backend/routes/prodRoutes.js");
const commentRouter = require("./backend/routes/commentRoutes.js");
const userRouter    = require("./backend/routes/usersRoutes.js");

app.use("/cats", catRouter)
app.use("/products", prodRouter)
app.use("/cats_products", catRouter)
app.use("/products_comments", commentRouter)
app.use("", userRouter)

// listeneeer
app.listen(puerto, function(error){
   if (error)
      console.log("Error al iniciar server")
   else
      console.log("Bienvenido/a! Escuchando en el puerto " + puerto)
})
