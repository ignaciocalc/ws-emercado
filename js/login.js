import {URLkey} from "./utils.js";
import {alerteMercado} from "./utils.js";

const
   body = document.body,
   usuario = document.getElementById("user"),
   contraseña = document.getElementById("password"),
   boton = document.getElementById("ingresarLogin"),
   parrafos = document.querySelectorAll(".claseError");

//----------- 
// -----> AddEventlistenners 
//----------- 

boton.addEventListener('click', function(){

   if (usuario.value != "" && contraseña.value != "") {

      if (usuario.validity.valid) {
         parrafos[1].style.display="none";
         parrafos[0].style.display="none";
         usuario.classList.replace("camposError", "camposInput");
         contraseña.classList.replace("camposError", "camposInput")
         validarUsuario(usuario.value, contraseña.value)
      } else {
         usuario.classList.replace("camposInput", "camposError");
         parrafos[0].textContent = "Ingrese un mail valido"
         parrafos[0].style.display="block";
      }

   } else {
      if (usuario.value == "") {
         parrafos[0].textContent = "El campo no puede estar vacío";
         usuario.classList.replace("camposInput", "camposError");
         parrafos[0].style.display="block";
      } else if (usuario.validity.valid) {
            usuario.classList.replace("camposError", "camposInput");
            parrafos[0].style.display="none";
            } else { 
               parrafos[0].textContent = "Ingrese un mail valido"
               usuario.classList.replace("camposError", "camposInput");
               parrafos[0].style.display="block";
            }
      
      if (contraseña.value == "") {
         parrafos[1].textContent = "El campo no puede estar vacío"
         contraseña.classList.replace("camposInput", "camposError");
         parrafos[1].style.display="block"
      } else {
         contraseña.classList.replace("camposError", "camposInput");
         parrafos[1].style.display="none"
      }
   }
})

//----------- 
// -----> Functiones 
//----------- 

function setModo(modo){
   if (modo == "oscuro") {
      body.className = "darkmode darkmodeinit"
   } else {
      body.className = "init"
   }
}

async function validarUsuario(mail, pass) {
   try {
      const respuesta = await fetch(URLkey, {
         method: "POST",
         headers: {
            "Content-Type" : "application/json"
         },
         body: JSON.stringify({email : mail, password: pass})
      });

      if (!respuesta.ok){
         const errorInfo = await respuesta.json();
         throw new Error(errorInfo.message || "Error al iniciar sesión");
      } 

         const userInfo = await respuesta.json();
         localStorage.setItem("user", JSON.stringify({user_id: userInfo.userId, email: mail, token: userInfo.userToken}));
         window.location = "index.html";

   } catch(error) {
      if (error == "Error: Usuario y/o contraseña invalidos") {
         alerteMercado("Usuario y/o contraseña invalidos");
         usuario.classList.replace("camposInput", "camposError");
         contraseña.classList.replace("camposInput", "camposError");
      } else {
         console.log("Ocurrio un error:", error);
         alerteMercado("Ocurrio un error")
      }
   }
}

setModo(localStorage.getItem("modo"))