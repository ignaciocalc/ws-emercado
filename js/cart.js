import {actualizarBadge} from "./utils.js";
import {alerteMercado} from "./utils.js";

const
   cotizacionDolar = 43,
   descubrirProductos = document.getElementById("carrito-descubrirProductos"),
   contenedorProductos = document.getElementById("carrito-productos"),
   contPrincipal = document.getElementById("carrito-contPrincipal"),
   valorSubtotalGen = document.getElementById("carrito-subtotalGeneral"),
   btnAlternarMoneda = document.getElementById("carrito-alternadorMoneda"),
   carritoTipoMoneda = document.getElementById("carrito-tipoMoneda"),
   pesosText = document.querySelector("#carrito-tipoMoneda :first-child"),
   dolaresText = document.querySelector("#carrito-tipoMoneda :last-child"),
   estiloMoneda = new Intl.NumberFormat('es-UY'),

   // Seleccionador de envio
   contListProduct = document.getElementById("contResumen"),
   tipoEnvioCont = document.getElementById("carrito-tipoEnvioGeneral"),
   btnDesplegarEnvio = document.getElementById("carrito-tipoEnvioContenedor"),
   formTipoEnvio = document.getElementById("carrito-opcionesEnvio"),
   precioEnvioCont = document.getElementById("carrito-precioEnvioLista"),
   carritoTotalCont = document.getElementById("carrito-total");


function actualizarCantItem(id, cantidadItem){
// si cantidadItem es 0 elimina el elemento por completo, actualizando el total si es necesario
// si se puede llamar a esta funcion existe el item cart en el ls
// si cantidadItem tiene un valor, ese valor se suma (o resta si es negativo) a la cantidad actual de productos
const
   carrito = JSON.parse(localStorage.getItem("cart")),
   posicion = carrito.productos.findIndex(elemento => elemento.idProducto == id);

   if (cantidadItem == 0){
      const
         cantidadEliminados = carrito.productos[posicion].cantidad;

      carrito.productos.splice(posicion, 1);
      if (carrito.productos.length == 0) {
         contPrincipal.className = "carrito-vacio"
         localStorage.removeItem("cart");
         actualizarBadge(0);
      } else {
         carrito.cantProductos = carrito.cantProductos - cantidadEliminados;
         actualizarBadge(carrito.cantProductos);
         localStorage.setItem("cart", JSON.stringify(carrito));
         sumarEnvioySubtotal()
      }
   } else {
      carrito.productos[posicion].cantidad += cantidadItem;
      carrito.cantProductos += cantidadItem;
      actualizarBadge(carrito.cantProductos); 
      localStorage.setItem("cart", JSON.stringify(carrito));
   }
}

function actSubtotal(idProducto, inputCantidad, precioU, accion) {
   const 
      valorInput = parseInt(inputCantidad.value),
      subtotalCont = document.getElementById(`subtotal-${idProducto}`),
      monedaSubTotal = subtotalCont.getAttribute("moneda"),
      cantidadProdGeneral = JSON.parse(localStorage.getItem("cart")).cantProductos,
      monedaTotal = carritoTipoMoneda.getAttribute("moneda"),
      productListPrecio = document.getElementById(`productList-precio-${idProducto}`);

   let
      subtotalGenActual = parseInt(valorSubtotalGen.getAttribute('valor')),
      valorSubtotalAct,
      aux;

   function actTotalySubtotal(){
      // Actualiza subtotal
      let subtotalProductoActual = inputCantidad.value * aux;

      if (subtotalProductoActual % 1 != 0)
      subtotalProductoActual = subtotalProductoActual.toFixed(2); 

      valorSubtotalAct = inputCantidad.value * precioU;
      subtotalCont.textContent = monedaSubTotal + " " + estiloMoneda.format(valorSubtotalAct);
      subtotalCont.setAttribute("valor", valorSubtotalAct);
      productListPrecio.textContent = monedaTotal + " " + estiloMoneda.format(subtotalProductoActual); 

      // Actualiza total
      

      subtotalGenActual -= valorInput * aux;
      subtotalGenActual += subtotalProductoActual;
      if (subtotalGenActual % 1 != 0)
      subtotalGenActual = subtotalGenActual.toFixed(2); 
      valorSubtotalGen.textContent = monedaTotal + " " + estiloMoneda.format(subtotalGenActual);
      valorSubtotalGen.setAttribute("valor", subtotalGenActual);
   }

   //Convertir moneda
   aux = precioU;
   if (monedaTotal != monedaSubTotal)
      if (monedaSubTotal == "UYU")
         aux = precioU / cotizacionDolar;
      else
         aux = precioU * cotizacionDolar;


   if ((valorInput < 99) && (accion == "agregar") && (cantidadProdGeneral < 99)) {
      //Actualizar su subtotal
      inputCantidad.value = valorInput + 1;

      //Actualizar total, subtotal y localstorage
      actTotalySubtotal();
      actualizarCantItem(idProducto, 1);
      sumarEnvioySubtotal()
   } else if ((valorInput > 1) && (accion == "remover")) {
      inputCantidad.value = valorInput - 1;
      //Actualizar total, subtotal y localstorage
      actTotalySubtotal();
      actualizarCantItem(idProducto, -1);
      sumarEnvioySubtotal()
   }  else if (valorInput != 1) {
      alerteMercado("No es posible agregar mas de 99 articulos al carrito");
   }
}

function removerItem(item, id) {
   const
      productoEnList = document.getElementById(`productList-${id}`);
   let
      duracionMs = 200,
      cantPasos = 30,
      pixeles = item.offsetHeight;

   // Elimina visualmente el elemento
   item.style.transform = "scale(0.95)";
   item.style.opacity = "0.0";
   duracionMs = duracionMs / cantPasos;
   pixeles = pixeles / cantPasos;
   productoEnList.remove();
   for (let i = 1; i <= cantPasos; i++){
      setTimeout(()=> {item.style.height = `${(cantPasos - i) * pixeles}px`}, i*duracionMs)
   }
   setTimeout(()=>{item.remove(); actualizarTotal();}, duracionMs*cantPasos);

   // Elimina el producto del localStorage y actualiza la cantidad de items
   actualizarCantItem(id, 0);
}

function mostrarProducto(producto) {
   const
      productoCard = document.createElement("section"),
      contImgProducto = document.createElement("div"),
      imgProducto = document.createElement("img"),
      infoProducto = document.createElement("div"),
      contSubtotalProducto = document.createElement("div"),
      nombreProducto = document.createElement("h1"),
      contEliMod = document.createElement("div"),
      btnEliminar = document.createElement("p"),
      contCantidad = document.createElement("div"),
      btnAgregar = document.createElement("img"),
      cantidad = document.createElement("input"),
      btnRemover = document.createElement("img"),
      subtotal = document.createElement("p"),
      subTotalValor = (producto.costo * producto.cantidad);
   
   //crear imagen de la tarjeta
   contImgProducto.className = "carrito-contImgProducto";
   imgProducto.src = producto.img;
   imgProducto.className = "carrito-imgProducto";
   contImgProducto.appendChild(imgProducto);
   
   //crear seccion con titulo, boton eliminar e input
   nombreProducto.textContent = producto.nombre;
   nombreProducto.className = "carrito-nombreProducto";
   nombreProducto.addEventListener("click", ()=>{
      localStorage.setItem("idProducto", producto.idProducto);
      window.location = "product-info.html"
   })

   contEliMod.className = "carrito-contEliMod";
   btnEliminar.textContent = "Eliminar";
   btnEliminar.addEventListener("click", ()=> {
      removerItem(productoCard, producto.idProducto)
   })
   contEliMod.appendChild(btnEliminar);
   contEliMod.appendChild(contCantidad);
   btnAgregar.className = "carrito-btnAgregar";
   btnAgregar.src = "img/add.svg";
   btnAgregar.addEventListener('click', function(){
      actSubtotal(producto.idProducto, cantidad, producto.costo, "agregar");
   });

   contCantidad.classList = "carrito-controlCantidad";
   contCantidad.appendChild(btnAgregar);
   cantidad.setAttribute("disabled", "");
   cantidad.setAttribute("id", producto.idProducto);
   cantidad.className = "carrito-cantProductos";
   cantidad.value = producto.cantidad;

   contCantidad.appendChild(cantidad);
   btnRemover.className = "carrito-btnRemover";
   btnRemover.src = "img/remove.svg";
   btnRemover.addEventListener('click', function() {
      actSubtotal(producto.idProducto, cantidad, producto.costo, "remover");
   })

   contCantidad.appendChild(btnRemover);

   infoProducto.className = "carrito-infoProducto"
   infoProducto.appendChild(nombreProducto);
   infoProducto.appendChild(contEliMod);

   //crear seccion con subtotal de producto
   subtotal.textContent = producto.moneda + " " + estiloMoneda.format(subTotalValor);
   subtotal.className = "carrito-subtotal";
   subtotal.id = `subtotal-${producto.idProducto}`;
   subtotal.setAttribute("moneda", producto.moneda);
   subtotal.setAttribute("valor", subTotalValor);
   contSubtotalProducto.appendChild(subtotal);
   contSubtotalProducto.className = "carrito-contSubtotal";

   //Creacion de tarjeta principal con producto
   productoCard.className = "carrito-cardProducto"
   productoCard.appendChild(contImgProducto);
   productoCard.appendChild(infoProducto);
   productoCard.appendChild(contSubtotalProducto);

   contenedorProductos.appendChild(productoCard)
}

function alternarMoneda() {
   const
      monedaActual = carritoTipoMoneda.getAttribute("moneda"),
      carrito = JSON.parse(localStorage.getItem("cart"));

   if (monedaActual== "UYU"){
      carritoTipoMoneda.style.minWidth = `${dolaresText.offsetWidth}px`
      pesosText.style.left = `+${pesosText.offsetWidth + 2}px`;
      dolaresText.style.left = "0";
      carritoTipoMoneda.setAttribute("moneda", "USD");
      actualizarTotal();
      actualizarSubtotales();
      carrito.moneda = "USD";
      localStorage.setItem("cart", JSON.stringify(carrito))
   } else {
      carritoTipoMoneda.style.minWidth = `${pesosText.offsetWidth}px`
      dolaresText.style.left = `+${dolaresText.offsetWidth + 2}px`;
      pesosText.style.left = "0";
      carritoTipoMoneda.setAttribute("moneda", "UYU");
      actualizarTotal()
      actualizarSubtotales()
      carrito.moneda = "UYU";
      localStorage.setItem("cart", JSON.stringify(carrito))
   }
}

function actualizarTotal(){
   const
      subtotales = document.querySelectorAll(".carrito-subtotal"),
      moneda = carritoTipoMoneda.getAttribute("moneda");
   let
      subtotalGen = 0;
   
   subtotales.forEach((elemento)=> {
      const
         monedaSub = elemento.getAttribute("moneda");
      let   
         valorSub = parseInt(elemento.getAttribute("valor"));
      
      if (moneda != monedaSub)
         if (moneda == "UYU")
            valorSub = valorSub * cotizacionDolar;
         else  
            valorSub = valorSub / cotizacionDolar;
      
      subtotalGen += valorSub;
   })

   // Actualizar subtotales
   if (subtotalGen % 1 != 0)
      subtotalGen = subtotalGen.toFixed(2); 

   valorSubtotalGen.textContent = moneda + " " + estiloMoneda.format(subtotalGen);
   valorSubtotalGen.setAttribute('valor', subtotalGen);  

   // Actualizar total segun envio
   sumarEnvioySubtotal()
}

function actualizarSubtotales(){
   const
      listSubtotales = document.querySelectorAll(".carrito-listProductCost"),
      subTotalesProduct = document.querySelectorAll(".carrito-subtotal"),
      moneda = carritoTipoMoneda.getAttribute("moneda");

   for (let i = 0; i < subTotalesProduct.length; i++){
      const
         monedaProducto = subTotalesProduct[i].getAttribute("moneda");
      let
         precioProducto = Number(subTotalesProduct[i].getAttribute("valor"));

      if (monedaProducto != moneda) {
         if (monedaProducto == "UYU")
            precioProducto = precioProducto / cotizacionDolar;
         else
            precioProducto = precioProducto * cotizacionDolar;
      }

      if (precioProducto % 1 != 0)
      precioProducto = precioProducto.toFixed(2); 

      listSubtotales[i].textContent = moneda + " " + estiloMoneda.format(precioProducto);
   }
}

function inicializarCarrito(){
   const
      carritoLs = localStorage.getItem("cart"),
      user = localStorage.getItem("user");
   
   if (carritoLs) {
      contPrincipal.className = "carrito-lleno";
      const carrito = JSON.parse(carritoLs);
   
      carrito.productos.forEach(producto => {
         mostrarProducto(producto);
         mostrarProductoSubtotal(producto);
      });

      switch (carrito.tipoEnvio) {
         case "Standard":
            formTipoEnvio.elements.envio.value = "Standard";
            break;
         case "Express":
            formTipoEnvio.elements.envio.value = "Express";
            break;
         case "Premium":
            formTipoEnvio.elements.envio.value = "Premium";
            break;
      }

      if (carrito.moneda == "UYU"){
         carritoTipoMoneda.style.minWidth = `${pesosText.offsetWidth}px`
         dolaresText.style.left = `+${dolaresText.offsetWidth + 2}px`;
         pesosText.style.left = "0";
         carritoTipoMoneda.setAttribute("moneda", "UYU");
      } else {
         carritoTipoMoneda.style.minWidth = `${dolaresText.offsetWidth}px`
         pesosText.style.left = `+${pesosText.offsetWidth + 2}px`;
         dolaresText.style.left = "0";
         carritoTipoMoneda.setAttribute("moneda", "USD");
      }
         
      actualizarTotal();
      actualizarSubtotales();
   } else {
      contPrincipal.className = "carrito-vacio";
   }

   if (user == null) {
      alerteMercado("Debe estar registrado para accede a esta sección", 3500);
      setTimeout(()=>window.location = "index.html", 3600)
   }
}

function mostrarProductoSubtotal(producto){
   const
      moneda = carritoTipoMoneda.getAttribute("moneda"),
      monedaProducto = producto.moneda,
      contProducto = document.createElement("div"),
      nombreProducto = document.createElement("p"),
      costoProducto = document.createElement("p");

   nombreProducto.textContent = producto.nombre;
   nombreProducto.className = "carrito-listPorductName";
   costoProducto.className = "carrito-listProductCost";
   costoProducto.id = `productList-precio-${producto.idProducto}`;
   

   contProducto.className = "carrito-listContProduct";
   contProducto.id = `productList-${producto.idProducto}`
   contProducto.appendChild(nombreProducto);
   contProducto.appendChild(costoProducto);

   contListProduct.appendChild(contProducto)
}

function sumarEnvioySubtotal(){
   const
      carrito = JSON.parse(localStorage.getItem("cart")),
      tipoEnvio = formTipoEnvio.elements.envio.value,
      tipoEnvioCont = document.getElementById("carrito-tipoEnvioMostrar"),
      demoraEnvioCont = document.getElementById("carrito-demoraEnvio"),
      moneda = carritoTipoMoneda.getAttribute("moneda"),
      subtotal = Number(valorSubtotalGen.getAttribute("valor"));
   let
      precioEnvio,
      totalCarrito;

   switch (tipoEnvio) {
      case "Standard":
         precioEnvio = subtotal * 5 / 100;
         tipoEnvioCont.textContent = "Standard";
         demoraEnvioCont.textContent = "Llega de 12 a 15 días";
         carrito.tipoEnvio = "Standard";
         break;
      case "Express":
         precioEnvio = subtotal * 7 / 100;
         tipoEnvioCont.textContent = "Express";
         demoraEnvioCont.textContent = "Llega de 5 a 8 días";
         carrito.tipoEnvio = "Express";
         break;
      case "Premium":
         precioEnvio = subtotal * 15 / 100;
         tipoEnvioCont.textContent = "Premium";
         demoraEnvioCont.textContent = "Llega de 2 a 5 días";
         carrito.tipoEnvio = "Premium";
         break;
   }

   totalCarrito = precioEnvio + subtotal;

   if (totalCarrito % 1 != 0)
      totalCarrito = totalCarrito.toFixed(2); 
   if (precioEnvio % 1 != 0)
      precioEnvio = precioEnvio.toFixed(2); 

   carritoTotalCont.textContent = moneda + " " + estiloMoneda.format(totalCarrito);
   precioEnvioCont.textContent = moneda + " " + estiloMoneda.format(precioEnvio);
   localStorage.setItem("cart", JSON.stringify(carrito));
}

// Seleccionar tipo envio
btnDesplegarEnvio.addEventListener('click', function(){
   if (tipoEnvioCont.classList.contains("carrito-eleccionEnvio-mostrar")){
      formTipoEnvio.style.removeProperty("min-height");
      tipoEnvioCont.className = "carrito-eleccionEnvio-ocultar";
   } else{
      tipoEnvioCont.className = "carrito-eleccionEnvio-mostrar";
      setTimeout(()=> formTipoEnvio.style.minHeight = "fit-content", 200);
   }
      
})

document.getElementById("carrito-contEnvioStandar").addEventListener("click", sumarEnvioySubtotal);
document.getElementById("carrito-contEnvioExpress").addEventListener("click", sumarEnvioySubtotal);
document.getElementById("carrito-contEnvioPremium").addEventListener("click", sumarEnvioySubtotal);


btnAlternarMoneda.addEventListener('click', alternarMoneda);
descubrirProductos.addEventListener('click', ()=> window.location = "categories.html");
inicializarCarrito();
