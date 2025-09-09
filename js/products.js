const catID = localStorage.getItem("catID");
const PRODUCTS_CAT = "https://japceibal.github.io/emercado-api/cats_products/" + catID + ".json";
let currentProductsArray = [];


let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

// recorre el listado actual de productos y crea la publicacion
// con la funcion createItemCard()
function writeData(arrayProd){
    for(let i = 0; i < arrayProd.length; i++){
        createItemCard(arrayProd[i].name, arrayProd[i].description, arrayProd[i].cost  /*USDollar.format(currentProductsArray[i].cost)*/, 
            arrayProd[i].currency, arrayProd[i].image, arrayProd[i].soldCount, arrayProd[i].id) ;
    }    
}

// hace el fetch del link y llena el array
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_CAT).then(function(resultObj){
        if(resultObj.status === "ok"){
            currentProductsArray = resultObj.data.products;
            writeData(resultObj.data.products);
        }
    });

})

function insertarHtml(contenedor, html){
    document.getElementById(contenedor).appendChild(html);

};

// crea la publicacion dentro de las categorias
function createItemCard(name, description, cost, currency, img, soldCount, ID){
        
    let htmlToInsert = document.createElement("section");
    htmlToInsert.classList.add('card');
    htmlToInsert.setAttribute('data-id', ID)

    htmlToInsert.innerHTML = `    
            <img src="${img}" class="card-img"/>
            <div class="card-cuerpo">
                <h1>${name}</h1>
                <p id="cantVendidos">${soldCount} vendidos</p>
                <p id="descripcion">${description}</p>
            </div>

            <div class="card-footer">
                <p class="card-precio">${currency} ${cost}</p>
                <p class="card-boton"><button class="button">  Agregar al carrito </button></p>
            </div>
    `;

    insertarHtml("contenedorItem", htmlToInsert);

    let card_link = document.querySelector(`[data-id="${ID}"]`);

    card_link.addEventListener("click", function() {
        localStorage.setItem("idProducto", ID);

        // aca va la direccion a la pagina
        window.location.href = "product-info.html";
    })
}

//Menu filtros
const
    mainProducts = document.getElementById("contPrincipal"),
    contFiltros = document.getElementById("filtrosContenedor"),
    flechaDesplegable = document.getElementById("flechaDesplegableImg"),

    contOrdenarPor = document.getElementById("contOrdenarPor"),
    flechaOrdenarPor = document.getElementById("flechaOrdenarPor"),
    listaOrdPor = document.getElementById("lista-OrdenarPor"),

    contFiltrarPrecio = document.getElementById("contBotonPrecio"),
    flechaFiltrarPrecio = document.getElementById("flechaFiltrarPrecio"),
    contMinMax = document.getElementById("contRangos"),
    btnFiltrar = document.getElementById("BtnFiltrar"),

    tipoFiltro = document.getElementById("tipoFiltro"),
    imgTipoFiltro = document.getElementById("imgTipoFiltro"),

    AZ = document.getElementById("AZ"),
    ZA = document.getElementById("ZA"),
    relevancia = document.getElementById("Relevancia"),
    precioA = document.getElementById("PrecioA"),
    precioD = document.getElementById("PrecioD");

function setli() {
    tipoFiltro.className = "mostrarfiltro";
    imgTipoFiltro.className = "mostrarfiltro";

    AZ.style.color = "black";
    ZA.style.color = "black";
    relevancia.style.color = "black";
    precioA.style.color = "black";
    precioD.style.color = "black";
}

flechaDesplegable.addEventListener('click', function(evento){
    if (flechaDesplegable.className == "flechaDesplegable-oculto") {
        flechaDesplegable.className = "flechaDesplegable-mostrar";
        contFiltros.className = "filtrosContenedor-mostrar";
        mainProducts.className = "mainProducts-FiltroMostrar";
    } else {
        flechaDesplegable.className = "flechaDesplegable-oculto";
        contFiltros.className = "filtrosContenedor-oculto";
        mainProducts.className = "mainProducts";
    }
    evento.stopPropagation();
})

contOrdenarPor.addEventListener('click', function(evento){
    if (flechaOrdenarPor.className == "flechaOrdenarPor-mostrar") {
        flechaOrdenarPor.classList = "flechaOrdenarPor-oculto";
        listaOrdPor.classList = "lista-OrdenarPor-oculto"
    } else {
        flechaOrdenarPor.className = "flechaOrdenarPor-mostrar";
        listaOrdPor.className = "lista-OrdenarPor-mostrar"
    }
    evento.stopPropagation();
})

contFiltrarPrecio.addEventListener('click', function(evento){
    if (flechaFiltrarPrecio.className == "flechaPrecio-mostrar") {
        flechaFiltrarPrecio.className = "flechaPrecio-oculto";
        contMinMax.className = "rangos-ocultos";
        btnFiltrar.className = "btn-oculto";
    } else {
        flechaFiltrarPrecio.className = "flechaPrecio-mostrar";
        contMinMax.className = "rangos-mostrar";
        btnFiltrar.className = "btn-mostrar";
    }
})

AZ.addEventListener('click', function(){
    tipoFiltro.textContent = "alfabeto";
    setli();
    AZ.style.color = "#3483fa";
    imgTipoFiltro.src = "img/AZ.svg";
})

ZA.addEventListener('click', function(){
    tipoFiltro.textContent = "alfabeto";
    setli();
    ZA.style.color = "#3483fa";
    imgTipoFiltro.src = "img/ZA.svg";
})

relevancia.addEventListener('click', function(){
    tipoFiltro.textContent = "relevancia";
    setli();
    relevancia.style.color = "#3483fa";
    imgTipoFiltro.src = "img/relevancia.svg";
})

precioA.addEventListener('click', function(){
    tipoFiltro.textContent = "precio";
    setli();
    precioA.style.color = "#3483fa";
    imgTipoFiltro.src = "img/precioAscendente.svg";
})

precioD.addEventListener('click', function(){
    tipoFiltro.textContent = "precio";
    setli();
    precioD.style.color = "#3483fa";
    imgTipoFiltro.src = "img/precioDescendente.svg";
})