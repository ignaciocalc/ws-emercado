import {URLkey} from "./utils.js";
import {URLCreateUser} from "./utils.js";
import {alerteMercado} from "./utils.js";

const
   body = document.body,
   usuario = document.getElementById("user"),
   contraseña = document.getElementById("password"),
   btnIngresar = document.getElementById("ingresarLogin"),
   parrafos = document.querySelectorAll(".claseError"),
   loginForm = document.getElementById("loginForm"),
   btnRegistrarse = document.getElementById("extra"),
   btnConfirmarReg = document.getElementById("registrarteLogin"),

   // inpust de registro
   inName = document.getElementById("name"),
   inLastName = document.getElementById("lastName"),
   inPhone = document.getElementById("phone");
//----------- 
// -----> AddEventlistenners 
//-----------

btnRegistrarse.addEventListener("click", function(){
   if (loginForm.classList.contains("login-logearse")) {
      inName.value = "";
      inLastName.value = "";
      usuario.value = "";
      contraseña.value = "";
      inPhone.value = "";
      inName.className = "camposInput";
      inLastName.className = "camposInput";
      usuario.className = "camposInput";
      contraseña.className = "camposInput";
      inPhone.className = "camposInput";
      parrafos[2].style.display="none";
      parrafos[3].style.display="none";
      btnRegistrarse.innerHTML = '<a class="link">Atras</a>';
      loginForm.className = "login-registrarse"
   } else {
      usuario.value = "";
      contraseña.value = "";
      parrafos.forEach(element => element.style.display = "none")
      usuario.className = "camposInput";
      contraseña.className = "camposInput";
      btnRegistrarse.innerHTML = '¿No tiene cuenta? <a class="link">Registrarse</a>';
      loginForm.className = "login-logearse";
   }
})

btnIngresar.addEventListener('click', function(){
   if (validacionUserPassInput())
      validarUsuario(usuario.value, contraseña.value)
});

btnConfirmarReg.addEventListener('click', function(){
   /* se coloca un if dentro de otro porque javascript evalua
      por cricuito corto*/
  if (validacionUserPassInput()) {
   if (validarNameLastNPhone()){
      crearUsuario(inName.value, inLastName.value, usuario.value, contraseña.value, inPhone.value)
   }
  } else {
      validarNameLastNPhone()
  }
});

//-----------
// -----> Functiones
//-----------

function validarNameLastNPhone() {

   if ((inName.value != "") && (inLastName.value != "") && (inPhone.value != "")) {
      inName.className = "camposInput";
      inLastName.className = "camposInput";
      inPhone.className = "camposInput";
      parrafos[0].style.display="none";
      parrafos[1].style.display="none";
      parrafos[4].style.display="none";
      return true
   } else {
      if (inName.value == "") {
         parrafos[0].style.display="block";
         inName.className = "camposError";
      } else {
         parrafos[0].style.display="none";
         inName.className = "camposInput";
      }

      if (inLastName.value == "") {
         parrafos[1].style.display="block";
         inLastName.className = "camposError";
      } else {
         parrafos[1].style.display="none";
         inLastName.className = "camposInput";
      }

      if (inPhone.value == "") {
         parrafos[4].style.display="block";
         inPhone.className = "camposError";
      } else {
         parrafos[4].style.display="none";
         inPhone.className = "camposInput";
      }
   }
}

function validacionUserPassInput(){
   if (usuario.value != "" && contraseña.value != "") {
      if (usuario.validity.valid) {
         parrafos[3].style.display="none";
         parrafos[2].style.display="none";
         usuario.classList.replace("camposError", "camposInput");
         contraseña.classList.replace("camposError", "camposInput")
         return true
      } else {
         usuario.classList.replace("camposInput", "camposError");
         parrafos[2].textContent = "Ingrese un mail valido"
         parrafos[2].style.display="block";
      }
   } else {
      if (usuario.value == "") {
         parrafos[2].textContent = "El campo no puede estar vacío";
         usuario.classList.replace("camposInput", "camposError");
         parrafos[2].style.display="block";
      } else if (usuario.validity.valid) {
            usuario.classList.replace("camposError", "camposInput");
            parrafos[2].style.display="none";
            } else { 
               parrafos[2].textContent = "Ingrese un mail valido"
               usuario.classList.replace("camposError", "camposInput");
               parrafos[2].style.display="block";
            }
      
      if (contraseña.value == "") {
         parrafos[3].textContent = "El campo no puede estar vacío"
         contraseña.classList.replace("camposInput", "camposError");
         parrafos[3].style.display="block"
      } else {
         contraseña.classList.replace("camposError", "camposInput");
         parrafos[3].style.display="none"
      }
   }
   return false
}

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
      } else if (error == "Error: Debe estar registrado para poder ingresar") {
         alerteMercado("Debe estar registrado para poder ingresar");
      } else {
         console.log("Ocurrio un error:", error);
         alerteMercado("Ocurrio un error")
      }
   }
}

// crearUsuario(inName.value, inLastName.value, usuario.value, contraseña.value, inPhone.value)
async function crearUsuario(nombre, apellido, mail, contraseña, celular) {
   try {
      const respuesta = await fetch(URLCreateUser, {
         method: "POST",
         headers: {
                     "Content-Type" : "application/json"
                  },
         body: JSON.stringify({
                                 nombre : nombre,
                                 apellido : apellido,
                                 email : mail,
                                 contrasena : contraseña,
                                 tel : celular,
                              })
      });

      const errorInfo = await respuesta.json();

      if (!respuesta.ok){
         throw new Error(errorInfo.message);
      } 

      console.log(errorInfo.message)
      alerteMercado("Te has registrado correctamente");
      btnRegistrarse.innerHTML = '¿No tiene cuenta? <a class="link">Registrarse</a>';
      loginForm.className = "login-logearse"

   } catch(error) {
      if (error == "Error: Ya existe un usuario con ese mail") {
         alerteMercado("El usuario ya se encuentra registrado");
         usuario.className = "camposError";
      } else if(error == "error"){
         inName.className = "camposError";
         inLastName.className = "camposError";
         usuario.className = "camposError";
         contraseña.className = "camposError";
         inPhone.className = "camposError";
         console.log("Ocurrio un error:", error);
         alerteMercado("Ocurrio un error, intente nuevamente");
      }
   }
}


setModo(localStorage.getItem("modo"))