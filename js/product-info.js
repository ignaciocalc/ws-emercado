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
      for (let img of imgSelecionables) {
         img.style.border = "solid 3px #e0e0e0";
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