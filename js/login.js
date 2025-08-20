const
   usuario = document.getElementById("user"),
   contraseña = document.getElementById("password"),
   boton = document.getElementById("ingresarLogin"),
   parrafos = document.querySelectorAll(".aclaracionAlerta");

boton.addEventListener('click', function(){
   usuario.classList.replace("claseError", "claseInput");
   contraseña.classList.replace("claseError", "claseInput");
   for (let p of parrafos)
      p.style.display='none';

   if (usuario.value != "" && contraseña.value != "") {
      window.location.href = "../index.html"
   } else {
      if (usuario.value == "") {
         usuario.classList.replace("claseInput", "claseError");
         parrafos[0].style.display="block";
      }
      if (contraseña.value == "") {
         contraseña.classList.replace("claseInput", "claseError");
         parrafos[1].style.display="block"
      }
   }
})