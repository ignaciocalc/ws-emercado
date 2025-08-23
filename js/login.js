const
   usuario = document.getElementById("user"),
   contraseña = document.getElementById("password"),
   boton = document.getElementById("ingresarLogin"),
   check = document.getElementById("checkRecordar"),
   label = document.getElementById("labelCheck"),
   parrafos = document.querySelectorAll(".claseError");

boton.addEventListener('click', function(){
   usuario.classList.replace("camposError", "camposInput");
   contraseña.classList.replace("camposError", "camposInput");
   label.style.color = '#000000';

   for (let p of parrafos)
      p.style.display='none';

   if (usuario.value != "" && contraseña.value != "" && check.checked) {
      localStorage.setItem("user", usuario.value);
      window.location.href = "../index.html";
   } else {
      if (usuario.value == "") {
         usuario.classList.replace("camposInput", "camposError");
         parrafos[0].style.display="block";
      }
      
      if (contraseña.value == "") {
         contraseña.classList.replace("camposInput", "camposError");
         parrafos[1].style.display="block"
      }

      if (!check.checked) {
         label.style.color = "#de514e";
      }
   }
})