const
   linkProducto = "https://japceibal.github.io/emercado-api/products/" +
                  localStorage.getItem('idProducto') + ".json",
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



// Eliminar al mergear
function mostrarComent(comentario){
   let PRUEBA = document.getElementById("PRUEBA");

   PRUEBA.innerHTML += `<p>${comentario.score}</p> <p>${comentario.description}</p> 
   <p>${comentario.user}</p>  <p>${comentario.dateTime}</p>`
}

// Eliminar al mergear

//Seccion de calificacion
let 
   comentar = document.getElementById("probarFuncionalidad"),
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
            
      mostrarComent(comentario);
      reComentar();
      popUpCalificar.className = "popUpCalificar-ocultar";
   }

   evento.stopPropagation();
})

popUpCalificar.addEventListener('click', function(evento){
   if (evento.target == popUpCalificar){
      reComentar();
      popUpCalificar.className = "popUpCalificar-ocultar";
   }
}) 