const 
   contBotones = document.getElementById("botonesHead"),
   ingresarHead = document.getElementById("ingresarHead"),
   botonUser = document.getElementById("datosUser"),
   carritoCompras = document.getElementById("carritoCompras"),
   logOut = document.getElementById("logout"),
   contBotUser = document.getElementById("contenidoUser");

let estaRegistrado = localStorage.getItem('user');

if (estaRegistrado != null) {
   /* Se muestra el tipo de botones correspondiente */
   contBotones.style.paddingRight = "30px";
   contBotones.style.gap = "12px";
   ingresarHead.style.display = "none";
   botonUser.style.display = "flex";
   carritoCompras.style.display = "flex";
   logOut.style.display = "flex";

   logOut.addEventListener('click', function(){
      localStorage.removeItem("user");
      window.location.reload();
   });

   if (estaRegistrado.length > 7)
      estaRegistrado = estaRegistrado.substring(0, 7) + '...';

   contBotUser.textContent = estaRegistrado;
} else {
   contBotones.style.paddingRight = "10px";
   contBotones.style.gap = "0";
   ingresarHead.style.display = "flex";
   botonUser.style.display = "none";
   carritoCompras.style.display = "none";
   logOut.style.display = "none";
} 