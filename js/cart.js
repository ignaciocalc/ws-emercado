import {actualizarBadge} from "./utils.js";
import {alerteMercado} from "./utils.js";

const
   cotizacionDolar = 43,
   descubrirProductos = document.getElementById("carrito-descubrirProductos"),
   contenedorProductos = document.getElementById("carrito-productos"),
   contPrincipal = document.getElementById("carrito-contPrincipal"),
   valorTotal = document.getElementById("carrito-total"),
   btnAlternarMoneda = document.getElementById("carrito-alternadorMoneda"),
   carritoTipoMoneda = document.getElementById("carrito-tipoMoneda"),
   pesosText = document.querySelector("#carrito-tipoMoneda :first-child"),
   dolaresText = document.querySelector("#carrito-tipoMoneda :last-child"),
   estiloMoneda = new Intl.NumberFormat('es-UY');

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
         localStorage.setItem("cart", JSON.stringify(carrito))
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
      monedaTotal = carritoTipoMoneda.getAttribute("moneda");

   let
      totalActual = parseInt(valorTotal.getAttribute('valor')),
      valorSubtotalAct,
      aux;

   function actTotalySubtotal(){
      // Actualiza subtotal
      valorSubtotalAct = inputCantidad.value * precioU;
      subtotalCont.textContent = monedaSubTotal + " " + estiloMoneda.format(valorSubtotalAct);
      subtotalCont.setAttribute("valor", valorSubtotalAct);

      // Actualiza total
      totalActual -= valorInput * aux;
      totalActual += inputCantidad.value * aux;
      valorTotal.textContent = monedaTotal + " " + estiloMoneda.format(totalActual);
      valorTotal.setAttribute("valor", totalActual);
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
   } else if ((valorInput > 1) && (accion == "remover")) {
      inputCantidad.value = valorInput - 1;
      //Actualizar total, subtotal y localstorage
      actTotalySubtotal();
      actualizarCantItem(idProducto, -1);
   }  else if (valorInput != 1) {
      alerteMercado("No es posible agregar mas de 99 articulos al carrito");
   }
}

function removerItem(item, id) {
   let
      duracionMs = 200,
      cantPasos = 30,
      pixeles = item.offsetHeight;

   // Elimina visualmente el elemento
   item.style.transform = "scale(0.95)";
   item.style.opacity = "0.0";
   duracionMs = duracionMs / cantPasos;
   pixeles = pixeles / cantPasos
   for (let i = 1; i <= cantPasos; i++){
      setTimeout(()=> {item.style.height = `${(cantPasos - i) * pixeles}px`}, i*duracionMs)
   }
   setTimeout(()=>{item.remove();  actualizarTotal();}, duracionMs*cantPasos);

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
      monedaActual = carritoTipoMoneda.getAttribute("moneda");

   if (monedaActual== "UYU"){
      carritoTipoMoneda.style.minWidth = `${dolaresText.offsetWidth}px`
      pesosText.style.left = `+${pesosText.offsetWidth + 2}px`;
      dolaresText.style.left = "0";
      carritoTipoMoneda.setAttribute("moneda", "USD");
      actualizarTotal()
   } else {
      carritoTipoMoneda.style.minWidth = `${pesosText.offsetWidth}px`
      dolaresText.style.left = `+${dolaresText.offsetWidth + 2}px`;
      pesosText.style.left = "0";
      carritoTipoMoneda.setAttribute("moneda", "UYU");
      actualizarTotal()
   }
}

function actualizarTotal(){
   const
      subtotales = document.querySelectorAll(".carrito-subtotal"),
      moneda = carritoTipoMoneda.getAttribute("moneda");
   let
      total = 0;
   
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
      
      total += valorSub;
   })

   
   if (total % 1 != 0)
      total = total.toFixed(2); 

   valorTotal.textContent = moneda + " " + estiloMoneda.format(total);
   valorTotal.setAttribute('valor', total);  
}

function inicializarCarrito(){
   const
      carritoLs = localStorage.getItem("cart");
   
   if (carritoLs) {
      contPrincipal.className = "carrito-lleno";
      const carrito = JSON.parse(carritoLs);
      carrito.productos.forEach(producto => {
         mostrarProducto(producto)
      });
      actualizarTotal()
   } else {
      contPrincipal.className = "carrito-vacio";
   }
}


btnAlternarMoneda.addEventListener('click', alternarMoneda);
descubrirProductos.addEventListener('click', ()=> window.location = "categories.html");
inicializarCarrito();
dolaresText.style.left = `+${dolaresText.offsetWidth + 2}px`;
carritoTipoMoneda.style.minWidth = `${pesosText.offsetWidth}px`