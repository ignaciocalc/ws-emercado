const
   contenedorProductos = document.getElementById("carrito-productos");


function agregarAlSubtotal(elemento) {
   const 
      valor = parseInt(elemento.value);

   if (valor < 99) 
      elemento.value = valor + 1
}

function quitarAlSubtotal(elemento) {
   const 
      valor = parseInt(elemento.value);

   if (valor <= 1) 
      alert("hola")
   else
      elemento.value = valor - 1
}

function removerItem(item) {
   let
      duracionMs = 200,
      cantPasos = 30,
      pixeles = item.offsetHeight;
   item.style.transform = "scale(0.95)";
   item.style.opacity = "0.0";
   duracionMs = duracionMs / cantPasos;
   pixeles = pixeles / cantPasos
   for (let i = 1; i <= cantPasos; i++){
      setTimeout(()=> {item.style.height = `${(cantPasos - i) * pixeles}px`}, i*duracionMs)
   }
   setTimeout(()=>{item.remove()}, duracionMs*cantPasos);
}
   

function actSubtotal(idProducto, cantidad, precioU, moneda){
   const
      subtotalCont = document.getElementById(idProducto)
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

   contEliMod.className = "carrito-contEliMod";
   btnEliminar.textContent = "Eliminar";
   btnEliminar.addEventListener("click", ()=> {removerItem(productoCard)})
   contEliMod.appendChild(btnEliminar);
   contEliMod.appendChild(contCantidad);
   btnAgregar.className = "carrito-btnAgregar";
   btnAgregar.src = "img/add.svg";
   btnAgregar.addEventListener('click', ()=> {agregarAlSubtotal(cantidad)
                                              actSubtotal(producto.idProducto, cantidad.value, producto.costo)});

   contCantidad.classList = "carrito-controlCantidad";
   contCantidad.appendChild(btnAgregar);
   cantidad.setAttribute("readonly", "")
   cantidad.className = "carrito-cantProductos";
   cantidad.value = producto.cantidad;

   cantidad.addEventListener("input", ()=> actSubtotal(producto.idProducto, producto.cantidad, producto.costo, producto.moneda)); 
   

   contCantidad.appendChild(cantidad);
   btnRemover.className = "carrito-btnRemover";
   btnRemover.src = "img/remove.svg";
   btnRemover.addEventListener('click', ()=> quitarAlSubtotal(cantidad))
   contCantidad.appendChild(btnRemover);

   infoProducto.className = "carrito-infoProducto"
   infoProducto.appendChild(nombreProducto);
   infoProducto.appendChild(contEliMod);

   //crear seccion con subtotal de producto
   subtotal.textContent = producto.moneda + " " + subTotalValor;
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

function inicializarCarrito(){
   const
      carritoLs = localStorage.getItem("cart"),
      contPrincipal = document.getElementById("carrito-contPrincipal");
   
   if (carritoLs) {
      contPrincipal.className = "carrito-lleno";
      const carrito = JSON.parse(carritoLs);
      carrito.productos.forEach(producto => {
         mostrarProducto(producto)
      });
   } else {
      contPrincipal.className = "carrito-vacio";
   }
}

inicializarCarrito();