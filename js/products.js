const catID = localStorage.getItem("catID");
const PRODUCTS_CAT = "https://japceibal.github.io/emercado-api/cats_products/" + catID + ".json";
let currentProductsArray = [];


let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

// recorre el listado actual de productos y crea la publicacion
// con la funcion createItemCard()
function writeData(){
    for(let i = 0; i < currentProductsArray.length; i++){
        createItemCard(currentProductsArray[i].name, currentProductsArray[i].description, currentProductsArray[i].cost  /*USDollar.format(currentProductsArray[i].cost)*/, 
            currentProductsArray[i].currency, currentProductsArray[i].image, currentProductsArray[i].soldCount, currentProductsArray[i].id) ;
    }    
}

// hace el fetch del link y llena el array
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_CAT).then(function(resultObj){
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



