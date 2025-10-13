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
   menuDesplegable = document.getElementById("menu"),
   email = document.getElementById("email");

   cerrarSesionMenu = document.getElementById("cerrarSesionMenu");

let 
   estaRegistrado = localStorage.getItem('user'),
   productsBusqueda = []

// ------------------------funciones para barra de busqueda-----------------------------------
const 
   barraBusqueda = document.getElementById("buscador");

function busqueda(){
   let texto = barraBusqueda.value.toLowerCase().trim(),
       resultadoBusqueda = [];

      for (let producto of productsBusqueda) {
         if (producto.name.toLowerCase().trim().includes(texto)) {
            resultadoBusqueda.push(producto)
         } else if (producto.description.toLowerCase().trim().includes(texto)) {
            resultadoBusqueda.push(producto)
         }
      }

      console.log(resultadoBusqueda)
       
   localStorage.setItem('resultBusqueda', JSON.stringify(resultadoBusqueda));


   // true ---> viene desde una categoria
   // false ---> viene desde la busqueda
   
   localStorage.setItem('redirect', false);
   localStorage.setItem('buscaValue', barraBusqueda.value);
   window.location.href = "products.html";
}

async function inicializarBusqueda() {

   let categorias = await (await fetch("https://japceibal.github.io/emercado-api/cats/cat.json")).json();

   categorias.forEach(async cat => {
       let prodTotales = await (await fetch("https://japceibal.github.io/emercado-api/cats_products/" + cat.id + ".json")).json();
         
      prodTotales.products.forEach(producto => {
         
         productsBusqueda.push(producto)
      })

      localStorage.setItem("productsBusqueda", JSON.stringify(productsBusqueda));

   })      

} 
   
document.addEventListener('DOMContentLoaded', function() {
   if (localStorage.getItem("productsBusqueda") === null) {
      inicializarBusqueda();
   } else {
      productsBusqueda = JSON.parse(localStorage.getItem("productsBusqueda"));
   }
})

barraBusqueda.addEventListener('click', function() {
   
   //detecta si se preciona la tecla enter luego de usar el buscador
   document.addEventListener("keydown", function(tecla) {
      if (tecla.key == "Enter") {
         busqueda()
      }
   });
      
})



// ---------------------------------------------------------------------------------------------


if (estaRegistrado != null) {
   /* Se muestra el tipo de botones correspondiente */
   contBotones.className = "botonesHeadLog";
   ingresarHead.className = "ingresarHeadLog";
   botonUser.className = "datosUserLogeado";
   carritoCompras.className = "carritoCompraslog";
   logOut.className = "logout";
   cerrarSesionMenu.className = "cerrarSesionMenu";
   ingresarIcon.style.display = "none";
   emailUser = JSON.parse(estaRegistrado).email;

   /* botones cel y tablet */
   datosUserCel.className = "datosUserLogeado"

   logOut.addEventListener('click', function(){
      localStorage.removeItem("user");
      window.location.reload();
   });

   cerrarSesionMenu.addEventListener('click', function(){
      localStorage.removeItem("user");
      window.location.reload();
   });
   
   if (emailUser.length > 31) {
      emailUser = emailUser.substring(0, 31) + "..."
   }

   email.textContent = "Hola, " + emailUser;
   
   emailUser = emailUser.substring(0, 1).toUpperCase();
   
   contBotUser.textContent = emailUser;
   contBotUserCel.textContent = emailUser;
   
} else {
   contBotones.className = "botonesHeadDeslog";
   ingresarHead.className = "ingresarHeadDesLog";
   botonUser.className = "datosUserDesLog";
   carritoCompras.className = "carritoComprasDeslog";
   logOut.className = "logoutNolog";

   datosUserCel.className = "datosUserDesLog";
   carritoComprasCel.className = "carritoComprasDeslog";
   cerrarSesionMenu.className = "cerrarSesionMenuOculto";

   email.textContent = "Iniciar sesion"

   email.addEventListener('click', function(){
      window.location.href = "login.html";
   });
} 

// controla la visualizacion de la barra de busqueda en pantalla de celular y tablet

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
      if (tecla.key == "Enter") {
         barraBuscador.className = "noBuscando";
         contBotonesCel.className = "buscadorIconoMostando";
         eMercadoLetras.className = "emercadoNoBuscando";
      }
   });
      
})

// Control de desplegable con las categorias
const
   cerrar = document.getElementById("botonClose"),
   desplegarBoton = document.getElementById("flechaCategorias"),
   botonCategoria = document.getElementById("categorias-menu"),
   lista = document.getElementById("lista-menu"),
   botonCategoriaPading = document.getElementById("categoriasBoton");


let menuAbierto = false;

menuBarras.addEventListener('click', function(pararProp) {
   menu.className = 'Desplegado';
   menuAbierto = true;
   pararProp.stopPropagation();
});


cerrar.addEventListener('click', function(pararProp) {
   menu.className = 'noDesplegado';
   desplegarBoton.className = "flechaCategorias";
   botonCategoriaPading.className = "categoriasBotonContraido";
   botonCategoria.className = "noDesplegadoCategorias";
   lista.className = "lista-menu-oculto";
   menuAbierto = false;
   pararProp.stopPropagation();
});


botonCategoria.addEventListener('click', function(pararProp) {
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
   pararProp.stopPropagation();
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

const
   botonInicio = document.getElementById("IrInicioMenu"),
   botonVender = document.getElementById("irVenderMenu");

botonInicio.addEventListener('click', function(pararEvento) {
   window.location.href = "index.html";
   pararEvento.stopPropagation();
})

botonVender.addEventListener('click', function(pararEvento) {
   window.location.href = "sell.html";
   pararEvento.stopPropagation();
})

