/*
    utils.js deberá ser usado únicamente para alojar utilidades 
    NO debe ejecutar código, solo declararlo para poder ser usado como módulo
    Se debe importar como módulo en el HTML que se quiera usar
*/

export const inicializaListenerCarrito = function (DOMvar, prod){

    console.log(DOMvar);
    
    DOMvar.addEventListener("click", (evento)=>{
        crearCarrito();
        evento.preventDefault(); 
        evento.stopPropagation(); 

        agregarACarrito(prod);

    })

}

// POST: retorna el producto con idProducto == id o null si no lo encuentra
async function obtenerProducto(id){
    let link = "https://japceibal.github.io/emercado-api/products/" + id + ".json";
     
    let res = await fetch(link);
    return await res.json();
}


// PRE: el carrito existe 
// POST: carrito actualizado con prod agregado
function agregarACarrito(prod){
    let carrito = JSON.parse(localStorage.getItem('cart'));

    if(carrito !== null){          // busca la primera expresión que coincida en el array y devuelve el  índice
        let pos = carrito.productos.findIndex(e => e.idProducto == prod.idProducto ); 

        if (pos === -1){
            carrito.productos.push(prod);
        } else {
            carrito.productos[pos].cantidad ++;
        }

        carrito.cantProductos += prod.cantidad; 

        localStorage.setItem('cart', JSON.stringify(carrito));
        // document.getElementById("carrito-badge").textContent = carrito.cantProductos;

        // localStorage.setItem('badge', JSON.stringify(carrito.cantProductos));
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
        // localStorage.setItem('badge', '0');
    }
}

