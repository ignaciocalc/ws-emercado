const PRODUCTS_CAT101 = "https://japceibal.github.io/emercado-api/cats_products/101.json";
let currentProductsArray = [];


// recorre el listado actual de productos y crea la publicacion
// con la funcion createItemCard()
function writeData(){
    for(let i = 0; i < currentProductsArray.length; i++){
        createItemCard(currentProductsArray[i].name, currentProductsArray[i].description, currentProductsArray[i].cost, currentProductsArray[i].currency, currentProductsArray[i].image, currentProductsArray[i].soldCount);
    }    
}

// hace el fetch del link y llena el array
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_CAT101).then(function(resultObj){
        if(resultObj.status === "ok"){
            currentProductsArray = resultObj.data.products;
            writeData();

        }
    });

})


function insertarHtml(contenedor, html){
    document.getElementById(contenedor).appendChild(html);

};

// crea la publicacion dentro de las categorias
function createItemCard(name, description, cost, currency, img, soldCount){
        
    let htmlToInsert = document.createElement("section");
    htmlToInsert.classList.add('card');

    htmlToInsert.innerHTML = `    
            <img src="${img}" class="card-img"/>

            <div class="card-cuerpo">
                <h1>${name}</h1>
                <p id="cantVendidos">${soldCount} vendidos</p>
                <p id="descripcion">${description}</p>
            </div>

            <div class="card-footer">
                <p class="card-precio">${currency} ${cost}</p>
                <p class="card-boton"><button class="button">Agregar al carrito </button></p>
            </div>                
            
    `;
        
    insertarHtml("contenedorItem", htmlToInsert);
}

