const usersModel = require("../models/usersModels.js");
const jwt = require("jsonwebtoken");

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
   
    if (!userInfo)
      res.status(401).json({message: "No se recibió información del usuario, debe incluirla en el cuerpo de la peticion"})
    else {   
        const user     = await usersModel.getUser(userInfo.email);
        // chequea si el usuario es válido 
        if ((userInfo.email == user.email) && (userInfo.password == user.password)){
            const token = jwt.sign(userInfo.email, SECRET_KEY);
            res.status(200).json({userToken: token})
        }   
    }
}

module.exports = {
   validUser,
}