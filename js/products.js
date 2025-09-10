const catID = localStorage.getItem("catID");
const PRODUCTS_CAT = "https://japceibal.github.io/emercado-api/cats_products/" + catID + ".json";
let currentProductsArray = [];

// Renderiza los productos en el contenedor
function writeData(){
    document.getElementById("contenedorItem").innerHTML = ""; // limpia antes de renderizar
    for(let i = 0; i < currentProductsArray.length; i++){
        createItemCard(
            currentProductsArray[i].name, 
            currentProductsArray[i].description, 
            currentProductsArray[i].cost, 
            currentProductsArray[i].currency, 
            currentProductsArray[i].image, 
            currentProductsArray[i].soldCount, 
            currentProductsArray[i].id
        );
    }    
}

// Carga los productos desde la API
document.addEventListener("DOMContentLoaded", function(){
    getJSONData(PRODUCTS_CAT).then(function(resultObj){
        if(resultObj.status === "ok"){
            currentProductsArray = resultObj.data.products;
            writeData();
        }
    });
});

function insertarHtml(contenedor, html){
    document.getElementById(contenedor).appendChild(html);
};

// Crea la tarjeta de producto
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
            <p class="card-boton"><button class="button">Agregar al carrito</button></p>
        </div>
    `;

    insertarHtml("contenedorItem", htmlToInsert);
    let card_link = document.querySelector(`[data-id="${ID}"]`);

    card_link.addEventListener("click", function() {
        localStorage.setItem("idProducto", ID);
        window.location.href = "product-info.html";
    })
    
}

/*ordena*/
function ordenarAZ() {
    currentProductsArray.sort((a, b) => a.name.localeCompare(b.name));
    writeData();
}

function ordenarZA() {
    currentProductsArray.sort((a, b) => b.name.localeCompare(a.name));
    writeData();
}

function ordenarPorRelevancia() {
    currentProductsArray.sort((a, b) => b.soldCount - a.soldCount);
    writeData();
}

/*filtra el precio */

function filtrarPorPrecio(min, max) {
    let filtrados = currentProductsArray.filter(p => p.cost >= min && p.cost <= max);
    document.getElementById("contenedorItem").innerHTML = "";
    filtrados.forEach(p => {
        createItemCard(p.name, p.description, p.cost, p.currency, p.image, p.soldCount, p.id);
    });
}

function aplicarFiltroPrecio(){
    let min = parseFloat(document.getElementById("minPrecio").value) || 0;
    let max = parseFloat(document.getElementById("maxPrecio").value) || Infinity;
    filtrarPorPrecio(min, max);
}
