const 
   contBotones = document.getElementById("botonesHead"),
   ingresarHead = document.getElementById("ingresarHead"),
   botonUser = document.getElementById("datosUser"),
   carritoCompras = document.getElementById("carritoCompras"),
   ingresarIcon = document.getElementById("ingresarIcono"),
   logOut = document.getElementById("logout"),
   contBotUser = document.getElementById("contenidoUser");

   // botones de tablet y celular
const
   contBotonesCel = document.getElementById("botonesCel"),
   buscadorIcon = document.getElementById("ingresarIcono"),
   datosUserCel = document.getElementById("datosUserCel"),
   carritoComprasCel = document.getElementById("carritoComprasCel"),
   contBotUserCel = document.getElementById("contenidoUserCel");
   
   

let estaRegistrado = localStorage.getItem('user');

if (estaRegistrado != null) {
   /* Se muestra el tipo de botones correspondiente */
   contBotones.className = "botonesHeadLog";
   ingresarHead.className = "ingresarHeadLog";
   botonUser.className = "datosUserLogeado";
   carritoCompras.className = "carritoCompraslog";
   logOut.className = "logout";
   ingresarIcon.style.display = "none";

   /* botones cel y tablet */
   datosUserCel.className = "datosUserLogeado"

   logOut.addEventListener('click', function(){
      localStorage.removeItem("user");
      window.location.reload();
   });

   if (estaRegistrado.length > 7)
      estaRegistrado = estaRegistrado.substring(0, 7) + '...';

   contBotUser.textContent = estaRegistrado;
   contBotUserCel.textContent = estaRegistrado;
} else {
   contBotones.className = "botonesHeadDeslog";
   ingresarHead.className = "ingresarHeadDesLog";
   botonUser.className = "datosUserDesLog";
   carritoCompras.className = "carritoComprasDeslog";
   logOut.className = "logoutNolog";

   datosUserCel.className = "datosUserDesLog";
   carritoComprasCel.className = "carritoComprasDeslog"
} 