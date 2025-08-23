const
   usuario = document.getElementById("user"),
   contraseña = document.getElementById("password"),
   boton = document.getElementById("ingresarLogin"),
   parrafos = document.querySelectorAll(".claseError");

boton.addEventListener('click', function(){
   usuario.classList.replace("camposError", "camposInput");
   contraseña.classList.replace("camposError", "camposInput");

   for (let p of parrafos)
      p.style.display='none';

   if (usuario.value != "" && contraseña.value != "") {
      localStorage.setItem("user", usuario.value);
      window.location.href = "index.html";
   } else {
      if (usuario.value == "") {
         usuario.classList.replace("camposInput", "camposError");
         parrafos[0].style.display="block";
      }
      
      if (contraseña.value == "") {
         contraseña.classList.replace("camposInput", "camposError");
         parrafos[1].style.display="block"
      }
   }
})