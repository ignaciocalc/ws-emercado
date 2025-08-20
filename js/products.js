const PRODUCTS_CAT101 = "https://japceibal.github.io/emercado-api/cats_products/101.json";
let currentProductsArray = [];
let desc;
let name;
let soldCount;
let currency;
let cost;
let img;


// funcion para testear
function readData(){
    for(let i = 0; i < currentProductsArray.length; i++){
        console.log(currentProductsArray[i].description)
    }
 
    // console.log(currentProductsArray.products[0].name);
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_CAT101).then(function(resultObj){
        if(resultObj.status === "ok"){
            currentProductsArray = resultObj.data.products;
            readData();
        }
    });

    desc = currentProductsArray[0].description;
    name = currentProductsArray[0].name;
    soldCount = currentProductsArray[0].soldCount;
    currency = currentProductsArray[0].currency;
    cost = currentProductsArray[0].cost;
    img = currentProductsArray[0].image;

})


// crear sections para las cards en el article id="contenedorItem"
// LISTAA


// esta funcion crea e inserta el html
function createItemCard(name, description, cost, currency, img, soldCount){
    
    // <section class="card">
    
    htmlToInsert = `    
        <div class="card">
            <img src="${img}" style="width:100%"/>
                <h1>${name}</h1>
                <p>${soldCount}</p>
                <p>${description}</p>
                <p>${currency}${cost}</p>
                <p><button>Agregar al carrito </button></p>
        </div>
    `
    // </section>

    // document.getElementById("contenedoritem").appendChild(htmlToInsert);
    document.getElementsByTagName("main")[0].appendChild(htmlToInsert);

    console.log("ENTRA A LA FUNCION");
}


createItemCard(name, desc, cost, currency, img, soldCount);

