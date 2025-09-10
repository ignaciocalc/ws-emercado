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
// Elementos de menu de filtros estandar
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
    selectMoneda = document.getElementById("selectMoneda"),

    tipoFiltro = document.getElementById("tipoFiltro"),
    imgTipoFiltro = document.getElementById("imgTipoFiltro"),

    AZ = document.getElementById("AZ"),
    ZA = document.getElementById("ZA"),
    relevancia = document.getElementById("Relevancia"),
    precioA = document.getElementById("PrecioA"),
    precioD = document.getElementById("PrecioD"),

// Elementos de menu de filtros Tablet y Celular
    btnFiltroTablet = document.getElementById("botonFiltros"),
    contFiltrosTablet = document.getElementById("filtrosContenedorMobileTablet"),
    btnOrdenarPor = document.getElementById("partContOrdenarPorMobile"),
    btnPrecio = document.getElementById("contBotonPrecioMobile"),
    ordPorContTablet = document.getElementById("contenedorOrdenarPor"),
    precioContTablet = document.getElementById("contenedorPrecio"),

    AZTablet = document.getElementById("AZMobile"),
    ZATablet = document.getElementById("ZAMobile"),
    relevanciaTablet = document.getElementById("RelevanciaMobile"),
    precioATablet = document.getElementById("PrecioAMobile"),
    precioDTablet = document.getElementById("PrecioDMobile"),

    tipoFiltroTablet = document.getElementById("tipoFiltroTablet"),

// Elementoos de seleccionador de moneda

    labelPesTablet = document.getElementById("labelPesTablet"),
    inPesosTablet = document.getElementById("lPesosTablet"),
    
    labelUSDTablet = document.getElementById("labelUSDTablet"),
    inDolaresTablet = document.getElementById("ldolaresTablet"),

    labelPes = document.getElementById("labelPes"),
    inPes = document.getElementById("lPesos"),

    labelUSD = document.getElementById("labelUSD"),
    inUSD = document.getElementById("ldolares");


function setli() {
    tipoFiltro.className = "mostrarfiltro";
    imgTipoFiltro.className = "mostrarfiltro";

    AZ.style.color = "black";
    AZTablet.style.color = "black";
    
    ZA.style.color = "black";
    ZATablet.style.color = "black";

    relevancia.style.color = "black";
    relevanciaTablet.style.color = "black";


    precioA.style.color = "black";
    precioATablet.style.color = "black";

    precioD.style.color = "black";
    precioDTablet.style.color = "black";
}

flechaDesplegable.addEventListener('click', function(evento){
    if (flechaDesplegable.className == "flechaDesplegable-oculto") {
        flechaDesplegable.className = "flechaDesplegable-mostrar";
        contFiltrosTablet.className = "filtrosContenedor-mostrar";
        contFiltros.className = "filtrosContenedor-mostrar";
        mainProducts.className = "mainProducts-FiltroMostrar";
    } else {
        flechaDesplegable.className = "flechaDesplegable-oculto";
        contFiltrosTablet.className = "filtrosContenedor-ocultar";
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

contFiltrarPrecio.addEventListener('click', function(evento) {
    if (flechaFiltrarPrecio.className == "flechaPrecio-mostrar") {
        flechaFiltrarPrecio.className = "flechaPrecio-oculto";
        contMinMax.className = "rangos-ocultos";
        btnFiltrar.className = "btn-oculto";
        selectMoneda.className = "selectMoneda-oculto"
    } else {
        flechaFiltrarPrecio.className = "flechaPrecio-mostrar";
        contMinMax.className = "rangos-mostrar";
        btnFiltrar.className = "btn-mostrar";
        selectMoneda.className = "selectMoneda-mostrar"
    }
})

// Elementos filtro tablet y celular

btnFiltroTablet.addEventListener('click', function(evento) {
    if (contFiltrosTablet.className == "filtrosContenedor-ocultar") {
        flechaDesplegable.className = "flechaDesplegable-mostrar";
        contFiltrosTablet.className = "filtrosContenedor-mostrar";
        contFiltros.className = "filtrosContenedor-mostrar";
        mainProducts.className = "mainProducts-FiltroMostrar";
    } else {
        flechaDesplegable.className = "flechaDesplegable-oculto";
        contFiltrosTablet.className = "filtrosContenedor-ocultar";
        contFiltros.className = "filtrosContenedor-oculto";
        mainProducts.className = "mainProducts";
    }
})


btnOrdenarPor.addEventListener('click', function(evento){
    btnOrdenarPor.className = "contenedorPFiltro-mostrar";
    btnPrecio.className = "contenedorPFiltro-ocultar";
    ordPorContTablet.className = "ordenarPorContenedor-mostrar";
    precioContTablet.className = "contenedorPrecio-ocultar"
})

btnPrecio.addEventListener('click', function(evento){
    btnPrecio.className = "contenedorPFiltro-mostrar";
    btnOrdenarPor.className = "contenedorPFiltro-ocultar";
    ordPorContTablet.className = "ordenarPorContenedor-ocultar";
    precioContTablet.className = "contenedorPrecio-mostrar";
})




function AZClick(){
    tipoFiltro.textContent = "alfabeto";
    tipoFiltroTablet.textContent = "Alfabéticamente AZ"
    setli();
    AZ.style.color = "#3483fa";
    AZTablet.style.color = "#3483fa";
    imgTipoFiltro.src = "img/AZ.svg";
}

function ZAClick(){
    tipoFiltro.textContent = "alfabeto";
    tipoFiltroTablet.textContent = "Alfabéticamente ZA"
    setli();
    ZA.style.color = "#3483fa";
    ZATablet.style.color = "#3483fa";
    imgTipoFiltro.src = "img/ZA.svg";
}

function relevanciaClick(){
    tipoFiltro.textContent = "relevancia";
    tipoFiltroTablet.textContent = "Relevancia"
    setli();
    relevancia.style.color = "#3483fa";
    relevanciaTablet.style.color = "#3483fa";
    imgTipoFiltro.src = "img/relevancia.svg";
}

function precioAClick(){
    tipoFiltro.textContent = "precio";
    tipoFiltroTablet.textContent = "Precio ascendente"
    setli();
    precioA.style.color = "#3483fa";
    precioATablet.style.color = "#3483fa";
    imgTipoFiltro.src = "img/precioAscendente.svg";
}

function precioDClick(){
    tipoFiltro.textContent = "precio";
    tipoFiltroTablet.textContent = "Precio descendente"
    setli();
    precioD.style.color = "#3483fa";
    precioDTablet.style.color = "#3483fa";
    imgTipoFiltro.src = "img/precioDescendente.svg";
}

function clickPesos() {
    labelPesTablet.className = "label-selec";
    labelUSDTablet.className = "label-noSelec";
    inPes.checked = true;
    inPesosTablet.checked = true;
    labelPes.className = "label-selec";
    labelUSD.className = "label-noSelec";
}

function clickDolares() {
    labelUSDTablet.className = "label-selec";
    labelPesTablet.className = "label-noSelec";
    inUSD.checked = true;
    inDolaresTablet.checked = true;
    labelUSD.className = "label-selec";
    labelPes.className = "label-noSelec";
}

//Elementos controladores de los filtros
AZ.addEventListener('click', AZClick);
AZTablet.addEventListener('click', AZClick);

ZA.addEventListener('click', ZAClick);
ZATablet.addEventListener('click', ZAClick);

relevancia.addEventListener('click', relevanciaClick)
relevanciaTablet.addEventListener('click', relevanciaClick)

precioA.addEventListener('click', precioAClick)
precioATablet.addEventListener('click', precioAClick)

precioD.addEventListener('click', precioDClick);
precioDTablet.addEventListener('click', precioDClick);


labelPesTablet.addEventListener('click', clickPesos);
labelPes.addEventListener('click', clickPesos);

labelUSDTablet.addEventListener('click', clickDolares);
labelUSD.addEventListener('click', clickDolares);