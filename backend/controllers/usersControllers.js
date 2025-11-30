const usersModel     = require("../models/usersModels.js");
const cartModel      = require("../models/cartModels.js");
const jwt            = require("jsonwebtoken");

const SECRET_KEY = "GRUPO6 SECRETKEY";
/* 
Objeto traido por el body con los datos de acceso para un usuario 

{
   email: ,
   password: ,
}
*/
async function validUser(req, res){

    const userInfo = req.body
   
    if (!userInfo) {
      res.status(401).json({message: "No se recibió información del usuario, debe incluirla en el cuerpo de la petición"})
    } else {   
        const user = await usersModel.getUser(userInfo.email);
        // chequea si el usuario es válido 
        
        if (user == undefined) {
            res.status(401).json({message: "Debe estar registrado para poder ingresar"})
        }
        if ((userInfo.email == user.email) && (userInfo.password == user.password)){
            const token = jwt.sign(userInfo.email, SECRET_KEY);
            res.status(200).json({userToken: token, userId: user.id_user})
        } else {
            res.status(401).json({message: "Usuario y/o contraseña invalidos"})
        }
    }
}

async function createUserAndCart(req, res){
    const userInfo = req.body;
    console.log(userInfo);

    if(!userInfo){
      res.status(401).json({message: "No se recibió información del usuario, debe incluirla en el cuerpo de la petición"})
    } else {
        let userEval = await usersModel.getUser(userInfo.email);
        if(userEval == undefined){
            const user = await usersModel.createUser(userInfo),
            cart = await cartModel.createCart(user);    
            res.status(201).json({ message: "Usuario registrado" });

        } else {
            res.status(400).json({message: "Ya existe un usuario con ese mail"})

        }
    }
}

module.exports = {
   validUser,
   createUserAndCart, 
}