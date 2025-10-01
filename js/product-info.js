const
   idProductoLS = localStorage.getItem('idProducto'),
   linkProducto = "https://japceibal.github.io/emercado-api/products/" + idProductoLS + ".json",
   imgPrincipal = document.getElementById("imgPrincipal"),
   galImg = document.getElementById("galImg"),
   nombreProd = document.getElementById("nombreProd"),
   categoriaProd = document.getElementById("categoriaProd"),
   cantVendidosProd = document.getElementById("cantVendidosProd"),
   precioProd = document.getElementById("precioProd"),
   descripcionProd = document.getElementById("descripcionProd"),
   // Seccion de productos relacionados
   listProdRel = document.getElementById("listProdRelacionados");

async function productInfo(link) {
   let 
      producto = await (await fetch(link)).json(),
      imgSelecionables,
      prodRelacionados;
   
   function imgSelecionada(img) {
      for (let imgs of imgSelecionables) {
         imgs.style.border = "solid 3px #e0e0e0";
      };
      imgSelecionables[img].style.border = "solid 3px #3483fa";
      imgPrincipal.src = producto.images[img];
   }

   function recargarLocalStorage(id) {
      localStorage.setItem('idProducto', id);
      window.location.reload();
   }

   //cargar imagen principal
   imgPrincipal.src = producto.images[0];

   // cargar imagenes en el contemedor de galImg
   for (let imagen of producto.images) {
      const nuevaImagen = document.createElement('img');
      nuevaImagen.className = "imgEnGal";
      nuevaImagen.src = imagen;
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

      listProdRel.appendChild(divCont);
   }

   // Funcionalidad de visor de imagenes
   imgSelecionables[0].addEventListener("mouseover", function (){
      imgSelecionada(0);
   })

   imgSelecionables[1].addEventListener("mouseover", function (){
      imgSelecionada(1);
   })

   imgSelecionables[2].addEventListener("mouseover", function (){
      imgSelecionada(2)
   })

   imgSelecionables[3].addEventListener("mouseover", function (){
      imgSelecionada(3);
   })
   // Fin funcionalidad de visor de imagenes

   //Productos relacionados
   prodRelacionados = document.querySelectorAll(".prodRelacionado")

   prodRelacionados[0].addEventListener('click', function(){
      recargarLocalStorage(prodRelacionados[0].id);
   })

   prodRelacionados[1].addEventListener('click', function(){
      recargarLocalStorage(prodRelacionados[1].id);
   })
}
productInfo(linkProducto);


//Seccion de calificacion
let 
   comentar = document.getElementById("btnComentar"),
   estrellas = document.querySelectorAll(".estrellasForm"),
   nombreUser = localStorage.getItem("user"),
   enviar = document.getElementById("enviarOpinion"),
   ingresar = document.getElementById("ingresarComent"),
   contComentario = document.getElementById('comentUser'),
   aviso = document.getElementById('aviso'),
   popUpCalificar = document.getElementById("popUpCalificar")
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

comentar.addEventListener("click", function(evento){
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

   evento.stopPropagation();
})

ingresar.addEventListener('click', function(){
         window.location.href = "login.html";
})

enviar.addEventListener('click', function(evento){
   const 
      score = bttnsRadio.value,
      comentarioText = contComentario.value;
         
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
                        user : nombreUser.substring(0, nombreUser.indexOf('@')),
                        dateTime : fechaFormato
                     };

      let 
         listComent = localStorage.getItem("lsComentarios");

      mostrarComent(comentario);
      reComentar();
      popUpCalificar.className = "popUpCalificar-ocultar";

      if (listComent !== null) {
         console.log("entro")
         listComent = JSON.parse(listComent);
         if (listComent[idProductoLS] == undefined){
            listComent[idProductoLS] = [];
         }
         listComent[idProductoLS].push(comentario);
         localStorage.setItem("lsComentarios", JSON.stringify(listComent))
      } else { 
         localStorage.setItem("lsComentarios", JSON.stringify({[idProductoLS] : [comentario]}));
      }
// local storage lsComentarios esttructura
// idProductoLS { {array comentarios}
//  ^                                  }
//  |
// El numero de ID del producto

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

   console.log(comen);
   
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

   // https://www.w3schools.com/howto/howto_css_star_rating.asp
   // nombre.className = "clas1 class2 class3"
}

async function obtenerComentarios() {
   let 
      comentarios = await (await fetch(linkComentarios)).json(),
      comentStorage = localStorage.getItem("lsComentarios");

   comentarios.forEach(a => mostrarComent(a));
   
   if(comentStorage !== null){ // chequeo que exista al menos un comentario guardado de al menos un producto
      comentStorage = JSON.parse(comentStorage)[idProductoLS];
      if (comentStorage !== undefined) { // no hay comentarios guardados de ese producto pero sí de otros 
         comentStorage.forEach(a => mostrarComent(a));
      }
   }

}

obtenerComentarios();