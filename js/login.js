const
   usuario = document.getElementById("user"),
   contraseña = document.getElementById("password"),
   boton = document.getElementById("ingresarLogin"),
   parrafos = document.querySelectorAll(".claseError");

boton.addEventListener('click', function(){

   if (usuario.value != "" && contraseña.value != "") {

      if (usuario.validity.valid) {
         localStorage.setItem("user", JSON.stringify({email : usuario.value}));
         window.history.back();
      } else {
         usuario.classList.replace("camposError", "camposInput");
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