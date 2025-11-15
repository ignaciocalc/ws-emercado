import {DEPARTAMENTOSYLOCALIDADES} from "./utils.js";

const
   btncurrencyChange = document.getElementById("purchaseProcess-currencyChange"),
   currencyUYU = document.getElementById("currencyUYU"),
   currencyUSD = document.getElementById("currencyUSD");

const
   btnShippingMethod = document.getElementById("purchaseProcess-btnshippingMethod"),
   shippingMethodCont = document.getElementById("purchaseProcess-shippingMethod"),
   shippingMethodSpan = document.getElementById("purchaseProcess-shippingMethodSpan"),
   shippingMethodDelay = document.getElementById("purchaseProcess-shippingDelay");

function initInputs(){
// Inicializa los inputs seleccionables de departamentos y localidades
   const
      selects = document.querySelectorAll(".purchaseProcess-select"),
      inputDepartamento = document.getElementById("purchaseProcess-inputDepartamento");

   selects.forEach(element => element.addEventListener("click", function(event){
      const
         contOptions = element.querySelector(".purchaseProcess-selectContOptions"),
         input = element.querySelector(".purchaseProcess-optionSelect"),
         img = element.querySelector(".purchase-process-selectImg"),
         optionSelect = event.target;

      if(contOptions.style.maxHeight == "30vh"){
         contOptions.style.maxHeight = "0";
         contOptions.style.border = "none"
         img.style.transform = "rotatex(0deg)"
      } else {
         contOptions.style.border = "solid 2px var(--border-inputsPurchaseProcess)"
         contOptions.style.maxHeight = "30vh";
         img.style.transform = "rotatex(180deg)"
      }

      if ((optionSelect != element) && (optionSelect != input) ){
         input.setAttribute("placeholder", optionSelect.textContent);
         input.setAttribute("valueInput", optionSelect.getAttribute('value'));
         input.dispatchEvent(new Event("input"));
      }
   }))

   inputDepartamento.addEventListener('input', function(){
      chargeOptionLocalidades(inputDepartamento.getAttribute("valueInput"));
   })

   // Inicialmente se muestra la moneda pesos
   currencyUSD.style.right = `-${currencyUSD.offsetWidth}px`;
   currencyUYU.style.right = "0px";
}


function chargeOptionLocalidades(departamento) {
   const 
      localidadesOptionsCont = document.getElementById("purchaseProcess-selectContLocalidad"),
      inputLocalidad = document.getElementById("purchaseProcess-inputLocalidad");

   // se reestablecen las opciones
   localidadesOptionsCont.innerHTML = "";
   inputLocalidad.setAttribute("placeholder", "Seleccione su localidad");

   // se cargan las nuevas opciones
   DEPARTAMENTOSYLOCALIDADES[departamento].forEach(element => {
      const
         opcion = document.createElement('div');
      
      opcion.className = "purchaseProcess-selectOption";
      opcion.textContent = element;
      localidadesOptionsCont.appendChild(opcion)
   })
}

btncurrencyChange.addEventListener("click", function(){
   const
      currencyGeneral = btncurrencyChange.getAttribute("moneda");

   if (currencyGeneral == "UYU"){
      currencyUYU.style.right = `-${currencyUYU.offsetWidth}px`;
      currencyUSD.style.right = "0px";
      btncurrencyChange.setAttribute("moneda", "USD");
   } else {
      currencyUSD.style.right = `-${currencyUSD.offsetWidth}px`;
      currencyUYU.style.right = "0px";
      btncurrencyChange.setAttribute("moneda", "UYU")
   }
})

// Muestra el contenedor con las opciones de envio
btnShippingMethod.addEventListener("click", function(event){
   if (shippingMethodCont.classList.contains("shippingMethod-hiddenOptions"))
      shippingMethodCont.className = "shippingMethod-showOptions"
   else
      shippingMethodCont.className = "shippingMethod-hiddenOptions";
})

// Permite seleccionar la opcion de envio 
shippingMethodCont.addEventListener("click", function(event){
   const
      shippingMethodSelect = event.target;

   if (shippingMethodSelect.classList.contains("purchaseProcess-shippingMethodInput")){
      shippingMethodselected(shippingMethodSelect.value)
   }  
})

// Establece visualmente el tipo de envio que recibe como parametro, hace el calculo correspondiente
// y guarda la informacion en el localstorage.
function shippingMethodselected(shippingMethod){

   let
      extraPercentage;

   switch (shippingMethod) {
      case "Standard":
         shippingMethodSpan.textContent = "Standard";
         shippingMethodDelay.textContent = "Llega de 12 a 15 dias";
         extraPercentage = 5;
         break
      case "Express":
         shippingMethodSpan.textContent = "Express";
         shippingMethodDelay.textContent = "Llega de 5 a 8 dias";
         extraPercentage = 7;
         break
      case "Premium":
         shippingMethodSpan.textContent = "Express";
         shippingMethodDelay.textContent = "Llega de 2 a 5 dias";
         extraPercentage = 15;
         break
   }

}

initInputs()