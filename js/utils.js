/*
    utils.js deberá ser usado únicamente para alojar utilidades 
    NO debe ejecutar código, solo declararlo para poder ser usado como módulo
    Se debe importar como módulo en el HTML que se quiera usar
*/

export const inicializaListenerCarrito = function (DOMvar, prod){
    
    DOMvar.addEventListener("click", (evento)=>{
        const
            user = localStorage.getItem('user');
        
        evento.preventDefault(); 
        evento.stopPropagation();

        if (user != null) {
            crearCarrito();
            agregarACarrito(prod);
        } else 
            alerteMercado("Debe estar registrado para poder realizar una compra");
    })

}

// PRE: el carrito existe 
// POST: carrito actualizado con prod agregado
function agregarACarrito(prod){
    
    let carrito = JSON.parse(localStorage.getItem('cart'));

    if(carrito !== null){          // busca la primera expresión que coincida en el array y devuelve el  índice
        let pos = carrito.productos.findIndex(e => e.idProducto == prod.idProducto ); 

        if ((pos === -1) && (carrito.cantProductos < 99)){
            carrito.productos.push(prod);
            carrito.cantProductos += prod.cantidad;
            actualizarBadge(carrito.cantProductos);
            localStorage.setItem('cart', JSON.stringify(carrito));
        } else if (carrito.cantProductos < 99 ){
            carrito.productos[pos].cantidad ++;
            carrito.cantProductos += prod.cantidad;
            actualizarBadge(carrito.cantProductos);
            localStorage.setItem('cart', JSON.stringify(carrito));
        } else {
            alerteMercado("No es posible agregar mas de 99 productos al carrito");
        }
         
    }
}


function crearCarrito(){
    let carrito = localStorage.getItem('cart');

    if(carrito == null){
        let cart = {
            productos: [],
            cantProductos: 0
        };
    
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

export function actualizarBadge(cant){
    const 
        badgeSem = document.getElementById("carrito-badge"),
        badgeCel = document.getElementById("carrito-badgeCel");
    
    badgeSem.textContent = cant;
    badgeCel.textContent = cant;
}

export function alerteMercado(string, duracionMs){
    const
        cartelPrincipal = document.createElement("div"),
        contImgLogo = document.createElement('div'),
        imgLogo = document.createElement('img'),
        mensaje = document.createElement('p'),
        transicionMs = 200,
        duracionEstandarMs = 3500; 
    
    let
        duracion = duracionEstandarMs;
    
    if (duracionMs != undefined) {
        duracion = duracionMs;
    }

    cartelPrincipal.id = "alerteMercado";

    contImgLogo.id = "alerteMercado-imagencont";
    imgLogo.id = "alerteMercado-imagen";
    imgLogo.src = "img/Logo_Naranja.png";
    contImgLogo.appendChild(imgLogo);

    mensaje.id = "alerteMercado-mensaje";
    mensaje.textContent = string;

    cartelPrincipal.appendChild(contImgLogo);
    cartelPrincipal.appendChild(mensaje);
    document.body.appendChild(cartelPrincipal);
    cartelPrincipal.style.top = `-${cartelPrincipal.offsetHeight + 20}px`;
    cartelPrincipal.style.transition = `top ${transicionMs}ms ease`

    requestAnimationFrame(() => {
        cartelPrincipal.style.top = `${1}vh`;
        setTimeout(()=> {
            cartelPrincipal.style.top = `-${cartelPrincipal.offsetHeight + 20}px`;
            setTimeout(()=>cartelPrincipal.remove(), transicionMs)
        },duracion)
    })
}