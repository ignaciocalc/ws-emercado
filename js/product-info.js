import {inicializaListenerCarrito} from "./utils.js";
import {btnComprarUnProducto} from "./utils.js";

const
   idProductoLS = localStorage.getItem('idProducto'),
   linkProducto = "http://localhost:3000/products/" + idProductoLS,
   imgPrincipal = document.getElementById("imgPrincipal"),
   galImg = document.getElementById("galImg"),
   nombreProd = document.getElementById("nombreProd"),
   categoriaProd = document.getElementById("categoriaProd"),
   cantVendidosProd = document.getElementById("cantVendidosProd"),
   precioProd = document.getElementById("precioProd"),
   descripcionProd = document.getElementById("descripcionProd"),
   // Seccion de productos relacionados
   listProdRel = document.getElementById("listProdRelacionados"),
   califGen = document.querySelectorAll(".califGen"),
   barrasEstrellas = document.querySelectorAll(".barrEstrella"),
   califCant = document.getElementById("califCant"),
   porcentajeP = document.querySelectorAll(".porcentajeP");

let 
   cantTipoEstrella = [0, 0, 0, 0, 0]; // cada item del arreglo representa la cantidad de votos
                                       // que se hicieron con ese tipo de estrella, por ejemplo. cantTipoEstrella[0]
                                       // representa la cantidad de votos que hay con 5 estrellas

async function productInfo(link) {
   let 
      imgSelecionables,   
      producto = await (await fetch(link)).json();
        
   function imgSelecionada(img) {
      for (let imgs of imgSelecionables) {
         imgs.style.border = "solid 3px #e0e0e0";
      };
      imgSelecionables[img].style.border = "solid 3px #3483fa";
      imgPrincipal.src = producto.images[img];
   }

   //cargar imagen principal  
   imgPrincipal.src = producto.images[0];
   
   // cargar imagenes en el contemedor de galImg y su funcionalidad
   for (let i = 0; i < producto.images.length; i++){
      const nuevaImagen = document.createElement('img');
      nuevaImagen.className = "imgEnGal";
      nuevaImagen.src = producto.images[i];
      nuevaImagen.addEventListener('mouseover', function(){
         imgSelecionada(i)
      })
      galImg.appendChild(nuevaImagen);
   }  

   // estilo de seleccionado a imagen 1 e inicializacion de imgSelecionables
   imgSelecionables = document.querySelectorAll(".imgEnGal");
   imgSelecionables[0].style.border = "solid 3px #3483fa";

   //cargar info sobre producto
   nombreProd.textContent = producto.name;
   categoriaProd.textContent = producto.category;
   cantVendidosProd.textContent = "Vendidos: " + producto.soldCount;
   descripcionProd.textContent = producto.description;
   precioProd.textContent = producto.currency + " " + producto.cost;

   //cargar productos relacionados
   for (let relProd of producto.relatedProducts) {
      const 
         divCont = document.createElement("div"),
         img = document.createElement("img"),
         nombre = document.createElement("p");
      
      img.src = relProd.image;
      img.className = "imgProdRel";

      nombre.textContent = relProd.name;
      nombre.classList = "nameProdRel";
      
      divCont.id = relProd.id;
      divCont.className = "prodRelacionado";
      divCont.appendChild(img);
      divCont.appendChild(nombre);

      //funcion al clickear 
      divCont.addEventListener('click', function(){
         localStorage.setItem('idProducto', divCont.id);
         window.location.reload();
      })

      listProdRel.appendChild(divCont);
   }

   let prod = {idProducto : idProductoLS, nombre : producto.name, costo : producto.cost, moneda : producto.currency, cantidad : 1, img : producto.images[0]};
   
   document.getElementById("botoncomprarinfo").addEventListener("click", ()=> {
      btnComprarUnProducto(prod);
   })

   inicializaListenerCarrito(document.getElementById("agregarCarritoInfo"), prod);;
}

//Actualiza las valoraciones generales

function actualizarEstilos(){
   let 
      totalValoraciones = 0,
      estrellasGen = 0;

   cantTipoEstrella.forEach(cantVal => totalValoraciones += cantVal);

   for (let i = 0; i < 5; i++) {
      let porcentaje = cantTipoEstrella[i] * 100 / totalValoraciones;
      barrasEstrellas[i].style.width = `${porcentaje}%`;
      if (!isNaN(porcentaje))
         porcentajeP[i].textContent = `${Math.trunc(porcentaje)}%`;

      estrellasGen += (5 - i) * porcentaje / 100;
   }

   estrellasGen = Math.trunc(estrellasGen);

   for (let i = 0; i < estrellasGen; i++) {
      califGen[i].className = "fa fa-star califGen checked"
   }

   for (let i = estrellasGen; i < 5; i++) {
      califGen[i].className = "fa fa-star califGen"
   }

   califCant.textContent = "de " + totalValoraciones;
}

function actualizarVal(tipoEstrella) {

   tipoEstrella = parseInt(tipoEstrella);

   switch (tipoEstrella) {
      case 1:
         cantTipoEstrella[4]++;
         break;
      case 2:
         cantTipoEstrella[3]++;
         break;
      case 3:
         cantTipoEstrella[2]++;
         break;
      case 4:
         cantTipoEstrella[1]++;
         break;
      case 5:
         cantTipoEstrella[0]++;
         break;
   }
}


//Seccion de calificacion
let 
   comentar = document.getElementById("btnComentar"),
   comentarSem = document.getElementById("btnComentarSem"),
   estrellas = document.querySelectorAll(".estrellasForm"),
   nombreUser = localStorage.getItem("user"),
   enviar = document.getElementById("enviarOpinion"),
   ingresar = document.getElementById("ingresarComent"),
   contComentario = document.getElementById('comentUser'),
   aviso = document.getElementById('aviso'),
   popUpCalificar = document.getElementById("popUpCalificar"),
   bttnsRadio = document.getElementById('cantEstrellas').elements.calif;

function pintarEstrella(evento){
   const 
      estrella = evento.currentTarget.getAttribute("estrella");

   for (let i = 0; i < estrella; i++){
      estrellas[i].className = "estrellasForm estrella estrellaSelect";
   }  

   for (let i = estrella; i < 5; i++){
      estrellas[i].className = "estrellasForm estrella";
   }
}

function reComentar(){
   estrellas.forEach((estrella) => estrella.className = "estrellasForm estrella");
   bttnsRadio.forEach((elemento) => elemento.checked = false);
   contComentario.value = "";
   aviso.className = "aviso-ocultar";
}


estrellas.forEach(estrella => {
   estrella.addEventListener('click', pintarEstrella);
});

function comentarAccion(evento){
   let
      calificar = document.getElementById("calificar"),
      noCalificar = document.getElementById("noCalificar");

   if (nombreUser == null){
      popUpCalificar.className = "popUpCalificar-mostrar";
      calificar.className = "calificar-ocultar";
      noCalificar.className = "noCalificar-mostrar";
   } else {
      popUpCalificar.className = "popUpCalificar-mostrar";
      calificar.className = "calificar-mostrar";
      noCalificar.className = "noCalificar-ocultar";
   }

   evento.stopPropagation()
}

comentar.addEventListener("click", comentarAccion);
comentarSem.addEventListener("click", comentarAccion)

ingresar.addEventListener('click', function(){
         window.location.href = "login.html";
})

enviar.addEventListener('click', function(evento){ //funcion para enviar comentario
   const 
      score = bttnsRadio.value,
      comentarioText = contComentario.value,
      emailUser = JSON.parse(nombreUser).email;
         
   if (score == "" || comentarioText == ""){

      if (score == "" && comentarioText == "") {
         aviso.textContent = "Debe seleccionar una calificación y escribir un comentario";
      } else if (score == "") {
         aviso.textContent = "Debe seleccionar una calificación";
      } else {
         aviso.textContent = "Debe escribir un comentario";
      }  

      aviso.classList = "aviso-mostrar";

   } else {
      const 
         fecha = new Date(),
         fechaFormato = `${fecha.toJSON().substring(0, 10)} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`, 
         comentario = {
                        product : localStorage.getItem("idProducto"), 
                        score : score,
                        description : comentarioText,
                        user : emailUser.substring(0, emailUser.indexOf('@')),
                        dateTime : fechaFormato
                     };

      let 
         listComent = localStorage.getItem("lsComentarios");

      mostrarComent(comentario);
      actualizarVal(comentario.score);
      actualizarEstilos();
      reComentar();
      popUpCalificar.className = "popUpCalificar-ocultar";

      if (listComent !== null) {
         listComent = JSON.parse(listComent);
         if (listComent[idProductoLS] == undefined){
            listComent[idProductoLS] = [];
         }
         listComent[idProductoLS].push(comentario);
         localStorage.setItem("lsComentarios", JSON.stringify(listComent))
      } else { 
         localStorage.setItem("lsComentarios", JSON.stringify({[idProductoLS] : [comentario]}));
      }

// local storage lsComentarios estructura
// {idProductoLS : [array comentarios]}
//    ^                                  }
//    |
//  El numero de ID del producto

   }

   evento.stopPropagation();
})

popUpCalificar.addEventListener('click', function(evento){
   if (evento.target == popUpCalificar){
      reComentar();
      popUpCalificar.className = "popUpCalificar-ocultar";
   }
}) 

// Seccion de comentarios 
const
   linkComentarios = "https://japceibal.github.io/emercado-api/products_comments/" + idProductoLS + ".json";

// cada comentario es un section del article (id="list-comment") en el html
function mostrarComent(comen){
   let nombre = document.createElement("h2"),
      descripcion = document.createElement("p"),
      fecha = document.createElement("p"),
      comentario = document.createElement("section"),
      contenedorComen = document.getElementById("list-comment"),
      contenedorEstrellas = document.createElement("span");

   nombre.textContent = comen.user;
   descripcion.textContent = comen.description;
   fecha.textContent = comen.dateTime;
   
   comentario.appendChild(nombre);
   comentario.appendChild(descripcion);

   contenedorComen.appendChild(comentario);


   for(let i = 0; i < comen.score; i++){
      const
         estrella = document.createElement("span")
      
      estrella.className = "fa fa-star checked";
      contenedorEstrellas.appendChild(estrella);
   }

   for(let i = 5; i > comen.score; i--){      
      const estrella = document.createElement("span");
      estrella.className = "fa fa-star";
      contenedorEstrellas.appendChild(estrella);
   }
   
   nombre.appendChild(contenedorEstrellas);
   contenedorEstrellas.appendChild(fecha);
   
   comentario.className = "comentario";
   nombre.className = "comentario-nombre";
   descripcion.className = "comentario-contenido";
   fecha.className = "comentario-fecha";
}

async function obtenerComentarios() {
   let 
      comentarios = await (await fetch(linkComentarios)).json(),
      comentStorage = localStorage.getItem("lsComentarios");

   comentarios.forEach(a => {mostrarComent(a); actualizarVal(a.score)});
   
   if(comentStorage !== null){ // chequeo que exista al menos un comentario guardado de al menos un producto
      comentStorage = JSON.parse(comentStorage)[idProductoLS];
      if (comentStorage !== undefined) { // verifica si hay comentarios de ese producto 
         comentStorage.forEach(a => {mostrarComent(a); actualizarVal(a.score)});
      }
   }

   actualizarEstilos()
}

productInfo(linkProducto);
obtenerComentarios();