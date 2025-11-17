/*
1) quitar estilos anteriores  [R]
2) redefinir html para que se acople al figma (buscar tema carrousel) [R]
 2.1) primero defino el carrousel y después le doy estilo a las tarjetas [R]
3) definir los estilos [R]
4) arreglar mambos localstorage y seteo de imagenes  [R]
*/

const 
    logoCar       = document.getElementById("index-categoriesLogoCar"),
    logoFurniture = document.getElementById("index-categoriesLogoFurniture"),
    logoToy       = document.getElementById("index-categoriesLogoToy");
const
    index         = localStorage.getItem("index") || null,
    actualDate    = ((d) => [d.getFullYear(), d.getMonth(), d.getDate()])(new Date());
    // actualDate = [2024, 1, 2]; 
const
    CATS                    = [101, 102, 103], // autos, juguetes, muebles
    PRODUCTS_CAT            = "https://japceibal.github.io/emercado-api/cats_products/",
    IMGSBANNER_CAR          = document.getElementsByClassName("index-carProduct"),
    IMGSBANNER_FURNITURE    = document.getElementsByClassName("index-furnitureProduct"),
    IMGSBANNER_TOY          = document.getElementsByClassName("index-toyProduct");
const 
    modo = localStorage.getItem("modo");


// Listeners de los logos  en el index
logoCar.addEventListener("click", function() {
    localStorage.setItem("catID", 101);
    // localStorage.setItem("redirect", true);
    window.location = "products.html"
});
logoToy.addEventListener("click", function() {
    localStorage.setItem("catID", 102);
    // localStorage.setItem("redirect", true);
    window.location = "products.html"
});
logoFurniture.addEventListener("click", function() {
    localStorage.setItem("catID", 103);
    // localStorage.setItem("redirect", true);
    window.location = "products.html"
});

// if(modo != "oscuro"){
//     logoCar.style.filter = "brightness(0) saturate(100%)";
// }


// inicializa index en LS
async function createIndexLS(){
    let index = {
            bannerCar  : [], 
            bannerHome : [], 
            bannerGame : [],
            date       : [actualDate[0], actualDate[1], actualDate[2]]
        };
    const bannerArray = [index.bannerCar, index.bannerGame, index.bannerHome];

    for(let i = 0; i < bannerArray.length; i++){
        let bannerType = bannerArray[i];

        let prods = await (await fetch(PRODUCTS_CAT + CATS[i] + ".json")).json();
        let randomIndex = getRandomList(prods.products.length,3);
        
        
        randomIndex.forEach(i => {
            bannerType.push({id :  prods.products[i].id, 
                            cost : prods.products[i].cost, 
                            currency : prods.products[i].currency, 
                            img : prods.products[i].image});
        });
    }

    // console.log(index);
    localStorage.setItem("index", JSON.stringify(index));

    initImages();

}

// devuelve una lista de numeros random sin repetición entre 
// 0 y maxNumber de largo listLength
function getRandomList(maxNumber, listLength){
    let list = [];

    while(list.length < listLength){
        let res =  Math.floor(Math.random()*(maxNumber))
        if(!list.includes(res)){
            list.push(res);
        }
    }
    return list;
}

function compareDate(date1, date2){
    console.log(date1);
    console.log(date2);

    return (date1[0] == date2[0]) && (date1[1] == date2[1]) && (date1[2] == date2[2]);

}

// inicializa las imagenes del banner en su contenedor
function initImages(){
    const indexLS = JSON.parse(localStorage.getItem("index"));

    // console.log(indexLS)
    for(let i = 0; i < IMGSBANNER_CAR.length; i++){
        IMGSBANNER_CAR[i].src = indexLS.bannerCar[i].img;
        IMGSBANNER_CAR[i].nextElementSibling.textContent = indexLS.bannerCar[i].currency + indexLS.bannerCar[i].cost; 

        IMGSBANNER_TOY[i].src = indexLS.bannerGame[i].img;
        IMGSBANNER_TOY[i].nextElementSibling.textContent = indexLS.bannerGame[i].currency + indexLS.bannerGame[i].cost; 

    }
    
    for(let i = 0; i < IMGSBANNER_FURNITURE.length;  i++){
        IMGSBANNER_FURNITURE[i].src = indexLS.bannerHome[i].img;
        IMGSBANNER_FURNITURE[i].nextElementSibling.textContent = indexLS.bannerHome[i].currency + indexLS.bannerHome[i].cost; 


    }

}

async function initIndex(indexLS){
    if(indexLS == null || !compareDate(indexLS.date, actualDate)){
        // si no le pongo await, se ejecuta intImages() sin los datos cargados al LS
        await createIndexLS(); 
    } else {  
        // createIndexLS();
        console.log();
        initImages();
    }
}

initIndex(JSON.parse(index));

