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
   buscadorIcon = document.getElementById("buscadorIcono"),
   datosUserCel = document.getElementById("datosUserCel"),
   carritoComprasCel = document.getElementById("carritoComprasCel"),
   contBotUserCel = document.getElementById("contenidoUserCel"),
   eMercadoLetras = document.getElementById("emercado");

const
   barraBuscador = document.getElementById("buscador"),
   menuBarras = document.getElementById("menuBarras"),
   menuDesplegable = document.getElementById("menu");

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


buscadorIcon.addEventListener('click', function() {
   contBotonesCel.className = "buscadorIconoBuscando";
   barraBuscador.className = "buscando";
   eMercadoLetras.className = "emercadoBuscando";

   event.stopPropagation();

   // se detecta si se hace click en el documento (sin contar el buscador)
   // para ocultar la barra de busqueda
   document.addEventListener("click", function (deteccionClick){
      if (!barraBuscador.contains(deteccionClick.target)) {
         barraBuscador.className = "noBuscando";
         contBotonesCel.className = "buscadorIconoMostando";
         eMercadoLetras.className = "emercadoNoBuscando";
      }
   });
   
   //detecta si se preciona la tecla enter
   document.addEventListener("keydown", function(tecla) {
      if (tecla.key === "Enter") {
         barraBuscador.className = "noBuscando";
         contBotonesCel.className = "buscadorIconoMostando";
         eMercadoLetras.className = "emercadoNoBuscando";
      }
   });
      
})

// Control de desplegable categorias
const
   cerrar = document.getElementById("botonClose"),
   desplegarBoton = document.getElementById("flechaCategorias"),
   botonCategoria = document.getElementById("categorias-menu"),
   lista = document.getElementById("lista-menu"),
   botonCategoriaPading = document.getElementById("categoriasBoton");


let menuAbierto = false;

menuBarras.addEventListener('click', function(event) {
   menu.className = 'Desplegado';
   menuAbierto = true;
   event.stopPropagation();
});


cerrar.addEventListener('click', function(event) {
   menu.className = 'noDesplegado';
   desplegarBoton.className = "flechaCategorias";
   botonCategoriaPading.className = "categoriasBotonContraido";
   botonCategoria.className = "noDesplegadoCategorias";
   lista.className = "lista-menu-oculto";
   menuAbierto = false;
   event.stopPropagation();
});


botonCategoria.addEventListener('click', function(event) {
   if (desplegarBoton.className === "flechaCategorias") {
      desplegarBoton.className = "flechaCategoriaDesplegada";
      botonCategoria.className = "DesplegadoCategorias";
      botonCategoriaPading.className = "categoriasBotonDesplegado";
      lista.className = "lista-menu-desplegado";
   } else {
      desplegarBoton.className = "flechaCategorias";
      botonCategoriaPading.className = "categoriasBotonContraido";
      botonCategoria.className = "noDesplegadoCategorias";
      lista.className = "lista-menu-oculto";
   }
   event.stopPropagation();
});

//Se cierra el menu si se le da click afuera de él
document.addEventListener('click', function(clicklugar) {
   if (menuAbierto && !menu.contains(clicklugar.target) && !menuBarras.contains(clicklugar.target)) {
      menu.className = 'noDesplegado';
      desplegarBoton.className = "flechaCategorias";
      botonCategoriaPading.className = "categoriasBotonContraido";
      botonCategoria.className = "noDesplegadoCategorias";
      lista.className = "lista-menu-oculto";
      menuAbierto = false;
   }
});