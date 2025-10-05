const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function setCatID(id) {
    localStorage.setItem("catID", id);
    localStorage.setItem("redirect", true)
    window.location = "products.html"
}

function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))){

            htmlContentToAppend += `
            <div onclick="setCatID(${category.id})" class="catCardPrincipal">
                <div class="catFila">
                    <img src="${category.imgSrc}" alt="${category.description}" class="imgCategories contCatImg">
                    <div class="conCatInfo">
                        <div class="catTitulo">
                            <h4 class="catNombre">${category.name}</h4>
                            <small class="catCantVendidos">${category.productCount} artículos</small>
                        </div>
                        <p class="catDescripcion">${category.description}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
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
    btnLimpiar = document.getElementById("btnLimpiarSem"),
    btnLimpiarMobile = document.getElementById("btnLimpiarMobile"),
    selectMoneda = document.getElementById("cantArtCat"),

    tipoFiltro = document.getElementById("tipoFiltro"),
    imgTipoFiltro = document.getElementById("imgTipoFiltro"),

    AZ = document.getElementById("AZ"),
    ZA = document.getElementById("ZA"),
    relevancia = document.getElementById("Relevancia");

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

    tipoFiltroTablet = document.getElementById("tipoFiltroTablet");

const
    conCatList = document.getElementById("contCatList");

flechaDesplegable.addEventListener('click', function(evento){
    if (flechaDesplegable.className == "flechaDesplegable-oculto") {
        flechaDesplegable.className = "flechaDesplegable-mostrar";
        contFiltrosTablet.className = "filtrosContenedor-mostrar";
        contFiltros.className = "filtrosContenedor-mostrar";
        conCatList.className = "mostrarFiltros";
    } else {
        flechaDesplegable.className = "flechaDesplegable-oculto";
        contFiltrosTablet.className = "filtrosContenedor-ocultar";
        contFiltros.className = "filtrosContenedor-oculto";
        conCatList.className = "ocultarFiltros";
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
        btnLimpiar.className = "btn-oculto";
        selectMoneda.className = "cantArtCat-oculto"
    } else {
        flechaFiltrarPrecio.className = "flechaPrecio-mostrar";
        contMinMax.className = "rangos-mostrar";
        btnFiltrar.className = "btn-mostrar";
        btnLimpiar.className = "btn-mostrar";
        selectMoneda.className = "cantArtCat-mostrar"
    }
})

// Elementos filtro tablet y celular

btnFiltroTablet.addEventListener('click', function(evento) {
    if (contFiltrosTablet.className == "filtrosContenedor-ocultar") {
        flechaDesplegable.className = "flechaDesplegable-mostrar";
        contFiltrosTablet.className = "filtrosContenedor-mostrar";
        contFiltros.className = "filtrosContenedor-mostrar";
        conCatList.className = "mostrarFiltros";
    } else {
        flechaDesplegable.className = "flechaDesplegable-oculto";
        contFiltrosTablet.className = "filtrosContenedor-ocultar";
        contFiltros.className = "filtrosContenedor-oculto";
        conCatList.className = "ocultarFiltros";
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




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CATEGORIES_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data
            showCategoriesList()
            //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

function setli() {
    tipoFiltro.className = "mostrarfiltro";
    imgTipoFiltro.className = "mostrarfiltro";

    AZ.style.color = "black";
    AZTablet.style.color = "black";
    
    ZA.style.color = "black";
    ZATablet.style.color = "black";

    relevancia.style.color = "black";
    relevanciaTablet.style.color = "black";
}


    function AZClick(){
        sortAndShowCategories(ORDER_ASC_BY_NAME);
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
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    }

    function relevanciaClick(){
        tipoFiltro.textContent = "relevancia";
        tipoFiltroTablet.textContent = "Relevancia"
        setli();
        relevancia.style.color = "#3483fa";
        relevanciaTablet.style.color = "#3483fa";
        imgTipoFiltro.src = "img/relevancia.svg";
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    }


    AZ.addEventListener("click", AZClick);

    AZTablet.addEventListener("click", AZClick);

    ZA.addEventListener("click", ZAClick)

    ZATablet.addEventListener("click", ZAClick);

    relevancia.addEventListener("click", relevanciaClick);

    relevanciaTablet.addEventListener("click", relevanciaClick);

    function limpiarClick(){
        document.getElementById("precioMinMobile").value = "";
        document.getElementById("precioMaxMobile").value = "";
        document.getElementById("precioMin").value = "";
        document.getElementById("precioMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    };

    btnLimpiar.addEventListener('click', limpiarClick);
    btnLimpiarMobile.addEventListener('click', limpiarClick);

    document.getElementById("BtnFiltrar").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("precioMin").value;
        maxCount = document.getElementById("precioMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });

    document.getElementById("BtnFiltrarMobileCat").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("precioMinMobile").value;
        maxCount = document.getElementById("precioMaxMobile").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });
});

