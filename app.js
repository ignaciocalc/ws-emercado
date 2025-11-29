// importacion de express y definicion de puerto
const express        = require("express");
const app    = express();
const puerto = 3000;

// Middleware para leer JSON
app.use(express.json());
app.use("/", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const catRouter     = require("./backend/routes/catRoutes.js");
const prodRouter    = require("./backend/routes/prodRoutes.js");
const commentRouter = require("./backend/routes/commentRoutes.js");
const userRouter    = require("./backend/routes/usersRoutes.js");
const cartRouter    = require("./backend/routes/cartRoutes.js");

app.use("/cats", catRouter)
app.use("/products", prodRouter)
app.use("/cats_products", catRouter)
app.use("/products_comments", commentRouter)
app.use("", userRouter)
app.use("", cartRouter)

// listeneeer
app.listen(puerto, function(error){
   if (error)
      console.log("Error al iniciar server")
   else
      console.log("Bienvenido/a! Escuchando en el puerto " + puerto)
})
