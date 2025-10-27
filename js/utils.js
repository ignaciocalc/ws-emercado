/*
    utils.js deberá ser usado únicamente para alojar utilidades 
    NO debe ejecutar código, solo declararlo para poder ser usado como módulo
    Se debe importar como módulo en el HTML que se quiera usar
*/


// PRE: debe recibir un array de elementos DOM a los que ponerle el eventlistener

export const inicializaListenerCarrito = function (DOMvar){
    // let carrito = document.getElementsByClassName("card-button");

    console.log(DOMvar);
    
    for(let i = 0; i < DOMvar.length; i++){
        DOMvar[i].addEventListener("click", async (evento)=>{
            crearCarrito();
            evento.preventDefault(); 
            evento.stopPropagation();  

            // agregar condicional si obtProd es null
            let id  = DOMvar[i].getAttribute("data-id");
            let prod = await obtenerProducto(id);
          
            let res = {
                idProducto : prod.id,
                nombre : prod.name,
                costo : prod.cost,
                moneda : prod.currency,
                cantidad : 1, 
                img : prod.images[0]
            }
            
            agregarACarrito(res);

            })
    }
}


// POST: retorna el producto con idProducto == id o null si no lo encuentra
// function obtenerProducto(id){
//     console.log("El array de productos es: " + currentProductsArray)
//     console.log(id);

//     return currentProductsArray.find(e => e.id == id) || null;
//     // este es el caso donde no se encuentra el producto
// }


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
        let pos = carrito.productos.findIndex(e => e.idProducto === prod.idProducto ); 

        if (pos === -1){
            carrito.productos.push(prod);
        } else {
            carrito.productos[pos].cantidad ++;
        }

        carrito.cantProductos = carrito.cantProductos + prod.cantidad; 

        localStorage.setItem('cart', JSON.stringify(carrito));
        localStorage.setItem('badge', JSON.stringify(carrito.cantProductos));
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
        localStorage.setItem('badge', '0');
    }
}

