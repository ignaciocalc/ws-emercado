const
   usuario = document.getElementById("user"),
   contraseña = document.getElementById("password"),
   boton = document.getElementById("ingresarLogin"),
   parrafos = document.querySelectorAll(".claseError");

boton.addEventListener('click', function(){
   if (usuario.value != "" && contraseña.value != "") {
      localStorage.setItem("user", usuario.value);
      window.location.href = "index.html";
   } else {
      if (usuario.value == "") {
         usuario.classList.replace("camposInput", "camposError");
         parrafos[0].style.display="block";
      } else {
         usuario.classList.replace("camposError", "camposInput");
         parrafos[0].style.display="none";
      }
      
      if (contraseña.value == "") {
         contraseña.classList.replace("camposInput", "camposError");
         parrafos[1].style.display="block"
      } else {
         contraseña.classList.replace("camposError", "camposInput");
         parrafos[1].style.display="none"
      }
   }
})