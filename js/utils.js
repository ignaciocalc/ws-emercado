/*
    utils.js deberá ser usado únicamente para alojar utilidades 
    NO debe ejecutar código, solo declararlo para poder ser usado como módulo
    Se debe importar como módulo en el HTML que se quiera usar
*/

export const DEPARTAMENTOSYLOCALIDADES = {
    Artigas: ["Artigas", "Bella Unión", "Tomás Gomensoro", "Sequeira", "Baltasar Brum"],
    Canelones: ["Canelones", "Las Piedras", "Pando", "Ciudad de la Costa", "Santa Lucía", "Sauce", "Tala", "Toledo", "Progreso", "La Paz"],
    CerroLargo: ["Melo", "Río Branco", "Fraile Muerto", "Aceguá", "Noblía", "Tupambaé"],
    Colonia: ["Colonia del Sacramento", "Carmelo", "Nueva Palmira", "Rosario", "Juan Lacaze", "Nueva Helvecia", "Tarariras"],
    Durazno: ["Durazno", "Sarandí del Yí", "La Paloma", "Carmen", "Centenario", "Blanquillo"],
    Flores: ["Trinidad", "Ismael Cortinas"],
    Florida: ["Florida", "Sarandí Grande", "25 de Agosto", "Casupá", "25 de Mayo", "Fray Marcos"],
    Lavalleja: ["Minas", "José Pedro Varela", "Solís de Mataojo", "Zapicán", "Mariscala"],
    Maldonado: ["Maldonado", "Punta del Este", "San Carlos", "Piriápolis", "Pan de Azúcar", "Aiguá"],
    Montevideo: ["Montevideo", "Pocitos", "Cordón", "Centro", "Prado", "Malvín"],
    Paysandu: ["Paysandú", "Guichón", "Quebracho", "Piedras Coloradas", "Lorenzo Geyres"],
    RioNegro: ["Fray Bentos", "Young", "Nuevo Berlín", "San Javier", "Grecco"],
    Rivera: ["Rivera", "Tranqueras", "Minas de Corrales", "Vichadero", "Mandubí"],
    Rocha: ["Rocha", "Chuy", "Castillos", "Lascano", "La Paloma", "Aguas Dulces", "19 de Abril"],
    Salto: ["Salto", "San Antonio", "Constitución", "Belén", "Colonia Lavalleja"],
    SanJose: ["San José de Mayo", "Ciudad del Plata", "Libertad", "Ecilda Paullier", "Rafael Perazza"],
    Soriano: ["Mercedes", "Dolores", "Cardona", "José Enrique Rodó", "Palmitas", "Risso"],
    Tacuarembo: ["Tacuarembó", "Paso de los Toros", "San Gregorio de Polanco", "Curtina", "Ansina"],
    TreintayTres: ["Treinta y Tres", "Vergara", "Santa Clara de Olimar", "Cerro Chato", "Valentines"]
};
export const URLkey = "http://localhost:3000/login";
export const URLCreateUser = "http://localhost:3000/register"
export const UPDATECART = "http://localhost:3000/cart";

export async function actualizarCart(idUser, token, cart){
    try {
        const response = await fetch(UPDATECART + "/" + idUser, {
            method: "PUT",
            headers: {
                        "Content-type" : "application/json",
                        "authorization" : token
                     },
            body: JSON.stringify(cart)
        })

        if (!response.ok) {
            const errorInfo = await respuesta.json();
            throw new Error(errorInfo.message)
        }

        const resInfo = await response.json();
        console.log(resInfo.message)
        
    } catch (error) {
        console.log(error);
    }
}

export function deleteCart(idUser, token){
    const cart = {
                   moneda : null,
                   cantProductos : null,
                   tipoEnvio : null,
                   productos : null,
                }

    actualizarCart(idUser, token, cart)
}

export async function getCart(idUser, token){
    try {
        const response = await fetch(UPDATECART + "/" + idUser, {
            method: "GET",
            headers: {
                        "Content-type" : "application/json",
                        "authorization" : token
                     },
        })

        if (!response.ok) {
            const errorInfo = await respuesta.json();
            throw new Error(errorInfo.message)
        }

        const cart = await response.json();

        if (cart.productos == undefined)
            return null

        return cart
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const inicializaListenerCarrito = function (DOMvar, prod){
    
    DOMvar.addEventListener("click", (evento)=>{
        let
            user = localStorage.getItem('user');
        
        evento.preventDefault(); 
        evento.stopPropagation();

        if (user != null) {
            user = JSON.parse(user)
            agregarACarrito(prod, user.user_id, user.token);
        } else 
            alerteMercado("Debe estar registrado para poder realizar una compra");
    })

}

// PRE: el carrito existe 
// POST: carrito actualizado con prod agregado
async function agregarACarrito(prod, idUser, token){
    const user = JSON.parse(localStorage.getItem("user"));
    let carrito = await getCart(idUser, token);

    if(carrito !== null){          // busca la primera expresión que coincida en el array y devuelve el  índice
        let pos = carrito.productos.findIndex(e => e.idProducto == prod.idProducto ); 

        if ((pos === -1) && (carrito.cantProductos < 99)){
            carrito.productos.push(prod);
            carrito.cantProductos += prod.cantidad;
            actualizarBadge(carrito.cantProductos);
            actualizarCart(user.user_id, user.token, carrito)
        } else if (carrito.cantProductos < 99 ){
            carrito.productos[pos].cantidad ++;
            carrito.cantProductos += prod.cantidad;
            actualizarBadge(carrito.cantProductos);
            actualizarCart(user.user_id, user.token, carrito)
        } else {
            alerteMercado("No es posible agregar mas de 99 productos al carrito");
        }
         
    } else {
        actualizarBadge(1);
        actualizarCart(user.user_id, user.token, {cantProductos: 1, moneda: 'UYU', productos: [prod], tipoEnvio: 'Standard'})
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

export function btnComprarUnProducto(producto){
    const
        registrado = localStorage.getItem("user");

    if (registrado != null ) {
        const 
            buyOneProduct = {
                                productos: [producto],
                                cantProductos: 1,
                                tipoEnvio: "Standard",
                                moneda: "UYU"
                            };
        
        localStorage.setItem('buyOneProduct', JSON.stringify(buyOneProduct));
        window.location = "purchase-process.html";
    } else {
        alerteMercado("Debe estar registrado para poder comprar")
    }
}