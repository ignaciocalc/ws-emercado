import {DEPARTAMENTOSYLOCALIDADES} from "./utils.js";
import {getCart} from "./utils.js";
import {deleteCart} from "./utils.js";

const
   mode = localStorage.getItem("modo"),
   buyOneProduct = localStorage.getItem("buyOneProduct"),
   cotizacionDolar = 43,
   coinStyle = new Intl.NumberFormat('es-UY',{minimumFractionDigits: 0, maximumFractionDigits: 2}),
   body = document.body,
   user = JSON.parse(localStorage.getItem("user"));

const
   contProducts = document.getElementById("purchaseProcess-contProducts"),
   step1ClickArea = document.getElementById("purchaseProcess-step1");

const
   purchaseProcessMain = document.getElementById("purchaseProcess-main");

const
   btncurrencyChange = document.getElementById("purchaseProcess-currencyChange"),
   currencyUYU = document.getElementById("currencyUYU"),
   currencyUSD = document.getElementById("currencyUSD");

const 
   localidadesOptionsCont = document.getElementById("purchaseProcess-selectContLocalidad");

const
   btnShippingMethod = document.getElementById("purchaseProcess-btnshippingMethod"),
   shippingMethodCont = document.getElementById("purchaseProcess-shippingMethod"),
   shippingMethodSpan = document.getElementById("purchaseProcess-shippingMethodSpan"),
   shippingMethodDelay = document.getElementById("purchaseProcess-shippingDelay"),
   shippingMethodForm = document.getElementById("purchaseProcess-shippingMethod-form");

const//contenedores generales de input del form
   contOptionDepartamento = document.getElementById("purchaseProcess-inputContDepartamento"),
   contOptionLocalidad = document.getElementById("purchaseProcess-inputContLocalidad"),
   contOptionCalle = document.getElementById("purchaseProcess-inputContCalle"),
   contOptionEsquina = document.getElementById("purchaseProcess-inputContEsquina"),
   contOptionNpuerta = document.getElementById("purchaseProcess-inputContNumeroPuerta");

const //input del form
   inputDepartamento = document.getElementById("purchaseProcess-inputDepartamento"),
   inputLocalidad = document.getElementById("purchaseProcess-inputLocalidad"),
   inputCalle = document.getElementById("purchaseProcess-inputCalle"),
   inputEsquina = document.getElementById("purchaseProcess-inputEsquina"),
   inputNPuerta = document.getElementById("purchaseProcess-inputPuerta");

const
   subTotalContainer = document.getElementById("purchaseProcess-subtotal"),
   shippingContainer = document.getElementById("purchaseProcess-shippingCost"),
   totalContainer = document.getElementById("orderSummary-total"),
   totalContainerMobile = document.getElementById("pruchaseProcess-menuMobile-totalCost");

const
   btnContinuar = document.getElementById("purchaseProcess-btnContinuar");

const //despliegue de opcion pagar con tc
   payOptionTDTC = document.getElementById("purchaseProcess-TC-TD"),
   payOptionTDTCclick = document.getElementById("purchaseProcess-TC-TD-clickArea");

const //contenedores generales de input de pago con tc
   contInputNumberTCTD = document.getElementById("purchaseProcess-TCTDNumberCont"),
   contInputDateTC = document.getElementById("purchaseProcess-DateTCCont"),
   contInputCVVCVC = document.getElementById("purchaseProcess-CVVCVCCont"),
   contInputNameCard = document.getElementById("purchaseProcess-nameTCTDCont");

const //input de pago con tc
   imgTCTD = document.getElementById("purchaseProcess-imgCard"),
   inputNumberTCTD = document.getElementById("purchaseProcess-TCTDnumber"),
   inputDateTC = document.getElementById("purchaseProcess-DateTC"),
   inputCVVCVC = document.getElementById("purchaseProcess-CVVCVC"),
   inputNameCard = document.getElementById("purchaseProcess-nameTCTD"),
   btnPagarTCTD = document.getElementById("purchaseProcess-Pagar");

const //despliegue de opcion pagar con mercado pago
   payOptionMP = document.getElementById("purchaseProcess-MercadoPago"),
   payOptionMPClick = document.getElementById("purchaseProcess-MercadoPago-clickArea");

const //contenedores generales de input de pago con mercadopago
   contInputNumberOp = document.getElementById("purchaseProcess-MercadoPago-numOpCont");

const //input de pago con mercadoPago
   InputNumberOp = document.getElementById("purchaseProcess-MercadoPago-numOp"),
   btnValidMercadoPago = document.getElementById("purchaseProcess-Validar");

const //despliegue de opcion pagar con mercado pago
   payOptionRed = document.getElementById("purchaseProcess-RedCobranza"),
   payOptionRedClick = document.getElementById("purchaseProcess-RedCobranza-clickArea"),
   orderId = document.getElementById("purchaseProcess-RedCobranzaOrderId");

const
   btnFinalizar = document.getElementById("purchaseProcess-Finalizar");

const //orderSummaryMobile
   arrowButton = document.getElementById("pruchaseProcess-arrowBtn"),
   arrowButtonimg = document.getElementById("pruchaseProcess-arrowBtnImg"),
   orderSummaryGeneralCont = document.getElementById("purchaseProcess-orderSummary");


const //popUps
   popUpsCont = document.getElementById("purchaseProcess-orderConfirmation"),
   popUpsMessegeLoading = document.getElementById("purchaseProcess-contmessage-loading"),
   popUpsMessegeSuccess = document.getElementById("purchaseProcess-contmessage-success"),
   contImgSucces = document.getElementById("purchaseProcess-contImgSuccess"),
   pSuccess = document.getElementById("purchaseProcess-pSuccess"),
   imgContCover = document.getElementById("purchaseProcess-contCoverImgSuccess");


//----------- 
// -----> AddEventlistenners 
//----------- 

btncurrencyChange.addEventListener("click", function(){
   const
      currencyGeneral = btncurrencyChange.getAttribute("moneda"),
      buyOneProduct = JSON.parse(localStorage.getItem("buyOneProduct"));

   if (currencyGeneral == "UYU"){
      currencyUYU.style.right = `-${currencyUYU.offsetWidth}px`;
      currencyUSD.style.right = "0px";
      btncurrencyChange.setAttribute("moneda", "USD");
      buyOneProduct.moneda = "USD";
      contProducts.innerHTML = "";
      showProduct(buyOneProduct.productos[0], "USD")
   } else {
      currencyUSD.style.right = `-${currencyUSD.offsetWidth}px`;
      currencyUYU.style.right = "0px";
      btncurrencyChange.setAttribute("moneda", "UYU");
      buyOneProduct.moneda = "UYU";
      contProducts.innerHTML = "";
      showProduct(buyOneProduct.productos[0], "UYU")
   }

   localStorage.setItem("buyOneProduct", JSON.stringify(buyOneProduct));
   calcSubtotal(buyOneProduct);
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
      shippingMethodselected(shippingMethodSelect.value);
   }  
})


// btnContinuar
btnContinuar.addEventListener("click", function(){
   if (isValidFormDirection()){
      purchaseProcessMain.classList.remove("purchaseStep1");
      purchaseProcessMain.classList.add("purchaseStep2");

      orderId.textContent = "#" + Math.random().toString().slice(2, 10);
   }
})


// ↓↓↓ control de estilo de verificacion para formulario invalido ↓↓↓
inputDepartamento.addEventListener("input", ()=> {contOptionDepartamento.classList.remove("invalid")});
inputLocalidad.addEventListener("input", ()=> {contOptionLocalidad.classList.remove("invalid")});
inputCalle.addEventListener("input", ()=> {contOptionCalle.classList.remove("invalid")});
inputEsquina.addEventListener("input", ()=> {contOptionEsquina.classList.remove("invalid")});
inputNPuerta.addEventListener("input", ()=> {contOptionNpuerta.classList.remove("invalid")});


// ↓↓↓↓ Control e implementacion de formulario tarjeta de credito ↓↓↓

inputNumberTCTD.addEventListener("input", function(){
   const
      inputValue = inputNumberTCTD.value;
      
   // No permite que se puedan escribir mas de 16 digitos
   if (inputValue.length > 16) {
      inputNumberTCTD.value = inputNumberTCTD.value.slice(0, inputNumberTCTD.maxLength);
   }

   if (inputValue.length == 16) {
      contInputNumberTCTD.classList.remove("invalid");
   }

   // seleccion de imagen de sello de tarjeta
   if (inputValue == "")
      imgTCTD.src = "img/tarjetaStandar.svg";
      else if (inputValue.slice(0, 1) == 4)
         imgTCTD.src = "img/icon-TarjetaVisa.svg";
         else {
            let inputValueSlice2 = inputValue.slice(0, 2);
            if ((inputValueSlice2 == 34) || (inputValueSlice2 == 37)) 
            imgTCTD.src = "img/icon-TarjetaAmericanExpress.svg";
               else {
                   let inputValueSlice2 = inputValue.slice(0, 2),
                       inputValueSlice6 = inputValue.slice(0, 6); 

                  if (((inputValueSlice2 >= 51) && (inputValueSlice2 <= 55)) || ((inputValueSlice6 >= 222100) && (inputValueSlice6 <= 272099)))
                     imgTCTD.src = "img/icon-TarjetaMaster.svg";
                     else {
                        let inputValueSlice3 = inputValue.slice(0, 3),
                            inputValueSlice2 = inputValue.slice(0, 2);

                      if (((inputValueSlice3 >= 300) && (inputValueSlice3 <= 305)) || 
                              (inputValueSlice3 == 309) || (inputValueSlice2 == 36) || 
                              (inputValueSlice2 == 38) || (inputValueSlice2 == 39))
                           imgTCTD.src = "img/icon-TarjetaDinner.svg";
                        else {
                           let inputValueSlice6 = inputValue.slice(0, 6);

                           if (((inputValueSlice6 >= 500000) && (inputValueSlice6 <= 509999)) || 
                                 ((inputValueSlice6 >= 560000) && (inputValueSlice6 <= 589999)) || 
                                 ((inputValueSlice6 >= 600000) && (inputValueSlice6 <= 699999)))
                           imgTCTD.src = "img/icon-TarjetaMaestro.svg";
                           else
                              imgTCTD.src = "img/tarjetaStandar.svg";
                        
         }}}}
})          

inputDateTC.addEventListener("input", function(){
   const
      inputValue = inputDateTC.value,
      lastChar = inputValue.slice(inputValue.length - 1);

   // Solo permite ingresar numeros
   if (!((lastChar >= "0") && (lastChar <= "9"))) {
      inputDateTC.value = inputValue.slice(0, inputValue.length - 1)
   }

   // permite escribir hasta 5 caracteres
   if (inputValue.length > 5) {
      inputDateTC.value = inputValue.slice(0, 5);
   }

   if (inputValue.length == 5) {
      contInputDateTC.classList.remove("invalid");
   }

   // Agrega un / entre el mes y el año
   if (inputDateTC.value.length >= 3 && !inputValue.includes("/") ) {
      inputDateTC.value = inputDateTC.value.slice(0, 2) + "/" + inputValue.slice(2);
   }
})


inputCVVCVC.addEventListener("input", function(){
   if (inputCVVCVC.value.length > 4) {
      inputCVVCVC.value = inputCVVCVC.value.slice(0, 4);
   }

   if (inputCVVCVC.value.length >= 3)
      contInputCVVCVC.classList.remove("invalid");
})

inputNameCard.addEventListener("input", function(){
   if (inputNameCard.value.length > 2)
      contInputCVVCVC.classList.remove("invalid");
})

btnPagarTCTD.addEventListener("click", function(){
   if (isValidFormTCTD()){
      showLoadingPopUps()
   }
})

payOptionTDTCclick.addEventListener("click", function(){
   if(payOptionTDTC.classList.contains("purchaseProcess-paymentOptionhidden")){
      payOptionTDTC.className = "purchaseProcess-paymentOptionShow"
   } else {
      payOptionTDTC.className = "purchaseProcess-paymentOptionhidden"
   }
})

// ↓↓↓↓ Implementacion de formulario pago con mercado pago ↓↓↓

payOptionMPClick.addEventListener("click", function(){
   if(payOptionMP.classList.contains("purchaseProcess-paymentOptionhidden")){
      payOptionMP.className = "purchaseProcess-paymentOptionShow"
   } else {
      payOptionMP.className = "purchaseProcess-paymentOptionhidden"
   }
})

btnValidMercadoPago.addEventListener("click", function(){
   if (InputNumberOp.value != "")
      showLoadingPopUps()
   else
      contInputNumberOp.classList.add("invalid")
})

InputNumberOp.addEventListener("input", function(){
   contInputNumberOp.classList.remove("invalid")
})

payOptionRedClick.addEventListener("click", function(){
   if(payOptionRed.classList.contains("purchaseProcess-paymentOptionhidden")){
      payOptionRed.className = "purchaseProcess-paymentOptionShow"
   } else {
      payOptionRed.className = "purchaseProcess-paymentOptionhidden"
   }
})

btnFinalizar.addEventListener("click", ()=> {finishPurchaseProcess()})
step1ClickArea.addEventListener("click", () => {purchaseProcessMain.classList.replace('purchaseStep2', 'purchaseStep1')})


arrowButton.addEventListener("click", function(){
   if (orderSummaryGeneralCont.style.bottom != "100%"){
      orderSummaryGeneralCont.style.bottom = "100%";
      arrowButtonimg.style.transform = "rotateX(180deg)"
   } else {
      orderSummaryGeneralCont.style.bottom = `calc(100% - ${orderSummaryGeneralCont.offsetHeight}px)`;
      arrowButtonimg.style.transform = "rotateX(0deg)"
   }
      
})

// ------------- 
// ----> declaracion de funciones
// ------------- 


function showLoadingPopUps() {
   popUpsCont.style.display = "flex";
   requestAnimationFrame(() => {
      popUpsCont.style.opacity = "100%";
      setTimeout(()=> {

   popUpsMessegeLoading.style.transform = "scale(0)";
   setTimeout(()=> {
                     popUpsMessegeLoading.style.display = "none";
                     popUpsMessegeSuccess.style.display = "flex";
                     setTimeout(() => {contImgSucces.style.transform = "scale(1)"}, 100);
                     setTimeout(() => {
                                       imgContCover.className = "imgSuccesShow";
                                       pSuccess.style.opacity = "100%";
                                       setTimeout(() => {finishPurchaseProcess()}, 500)
                                      }, 100 + 200);
                  }, 200);
   
   }, 3000)})
   
}

function finishPurchaseProcess() {
   if (buyOneProduct != null) {
      localStorage.removeItem("buyOneProduct");
   } else {
      deleteCart(user.user_id, user.token);
   }
   window.location = "index.html"
}

function isValidFormTCTD() {
   if ((inputNumberTCTD.value.length == 16) && (inputDateTC.value.length == 5) &&
       (inputCVVCVC.value.length >= 3) && (inputNameCard.value  != ""))
       return true;
   else {
      if (inputNumberTCTD.value.length != 16)
         contInputNumberTCTD.classList.add("invalid");
      
      if (inputDateTC.value.length != 5)
         contInputDateTC.classList.add("invalid");

      
      if (inputCVVCVC.value.length < 3)
         contInputCVVCVC.classList.add("invalid");

      if (inputNameCard.value  == "")
         contInputNameCard.classList.add("invalid");

      return false
   }
}  

function isValidFormDirection(){
const
   inputDepartamentoValue = inputDepartamento.getAttribute("valueinput"),
   inputLocalidadValue = inputLocalidad.getAttribute("valueinput")

   if ((inputDepartamentoValue != null) && (inputLocalidadValue != null) &&
       (inputCalle.value  != "") && (inputEsquina.value  != "") && (inputNPuerta.value  != ""))
       return true;
   else {
      if (inputDepartamentoValue == null)
         contOptionDepartamento.classList.add("invalid");

      if (inputLocalidadValue == null)
         contOptionLocalidad.classList.add("invalid");

      
      if (inputCalle.value == "")
         contOptionCalle.classList.add("invalid");

      if (inputEsquina.value == "")
         contOptionEsquina.classList.add("invalid");

      if (inputNPuerta.value == "")
         contOptionNpuerta.classList.add("invalid");

      return false
   }
}

function initInputs(){
// Inicializa los inputs seleccionables de departamentos y localidades

const
   selects = document.querySelectorAll(".purchaseProcess-select");

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
         input.setAttribute("value", optionSelect.textContent);
         input.setAttribute("valueInput", optionSelect.getAttribute('value'));
         input.dispatchEvent(new Event("input"));
      }
   }))

   inputDepartamento.addEventListener('input', function(){
      chargeOptionLocalidades(inputDepartamento.getAttribute("valueInput"));
   })

   // Muestra la moneda que se encuentra en LS
   if (buyOneProduct != null) {
      const buyOneProductOBJ = JSON.parse(buyOneProduct);
      if (buyOneProductOBJ.moneda == "UYU"){
         currencyUSD.style.right = `-${currencyUSD.offsetWidth}px`;
         currencyUYU.style.right = "0px";
      } else {
         currencyUYU.style.right = `-${currencyUYU.offsetWidth}px`;
         currencyUSD.style.right = "0px";
      }

   }
   
}


function chargeOptionLocalidades(departamento) {

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


// Establece visualmente el tipo de envio que recibe como parametro, hace el calculo correspondiente
// y guarda la informacion en el localstorage.
function shippingMethodselected(shippingMethod){

   const
      currencyGeneral = btncurrencyChange.getAttribute("moneda"),
      subtotalValue = Number(subTotalContainer.getAttribute("valor"));

   let
      extraPercentage,
      shippingCost,
      total;

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
         shippingMethodSpan.textContent = "Premium";
         shippingMethodDelay.textContent = "Llega de 2 a 5 dias";
         extraPercentage = 15;
         break
   }

   shippingCost = subtotalValue * (extraPercentage / 100);
   total = subtotalValue + shippingCost;

   shippingContainer.textContent = currencyGeneral + " " + coinStyle.format(shippingCost);
   totalContainer.textContent = currencyGeneral + " " + coinStyle.format(total);
   totalContainerMobile.textContent = currencyGeneral + " " + coinStyle.format(total);

   if (buyOneProduct != null){
      const buyOneProductOBJ = JSON.parse(localStorage.getItem("buyOneProduct"));

      buyOneProductOBJ.tipoEnvio = shippingMethod;

      localStorage.setItem("buyOneProduct", JSON.stringify(buyOneProductOBJ))
   }
}


function showProduct(product, currencyShow) {
   const
      currencyProduct = product.moneda,
      contProducto = document.createElement("div"),
      nameProduct = document.createElement("p"),
      costProductCont = document.createElement("p");

   let productCost = Number(product.costo) * Number(product.cantidad);

   nameProduct.textContent = product.nombre;
   nameProduct.className = "purchaseProcess-orderSummary-productName";
   costProductCont.className = "purchaseProcess-orderSummary-productNamecost";
   if (currencyShow != currencyProduct) {
      if(currencyProduct == "UYU")
         productCost = productCost / cotizacionDolar
      else
         productCost = productCost * cotizacionDolar
   }

   costProductCont.textContent = currencyShow + " " + coinStyle.format(productCost);
   costProductCont.id = `productList-precio-${product.idProducto}`;
   

   contProducto.className = "purchaseProcess-orderSummary-contProductList";
   contProducto.appendChild(nameProduct);
   contProducto.appendChild(costProductCont);

   contProducts.appendChild(contProducto);
}

// calcula el subtotal en base al item guardado en el local storage
function calcSubtotal(itemLS) {
   let
      total = 0;

   itemLS.productos.forEach(element => {
      let
         subtotalProduct = element.costo * element.cantidad;
      
      if (element.moneda != itemLS.moneda)
         if (element.moneda == "UYU")
            subtotalProduct = subtotalProduct / cotizacionDolar;
         else
            subtotalProduct = subtotalProduct * cotizacionDolar;
      
      total += subtotalProduct
   })

   subTotalContainer.textContent = itemLS.moneda + " " + coinStyle.format(total);
   totalContainerMobile.textContent = itemLS.moneda + " " + coinStyle.format(total);
   subTotalContainer.setAttribute("valor", total);
   shippingMethodselected(itemLS.tipoEnvio)
}

async function initPurchaseProcess(){
   if (buyOneProduct != null) {
      const buyOneProductObj = JSON.parse(buyOneProduct);
      purchaseProcessMain.classList.add("buyOneProduct");
      btncurrencyChange.setAttribute("moneda", buyOneProductObj.moneda);
      showProduct(buyOneProductObj.productos[0], buyOneProductObj.moneda);
      shippingMethodForm.elements.tipoEnvio.value = buyOneProductObj.tipoEnvio
      calcSubtotal(buyOneProductObj);
   } else {
      console.log(user.user_id, user.token);
      const cartOBJ = await getCart(user.user_id, user.token);
      console.log(cartOBJ)
      console.log(cartOBJ.productos)
      cartOBJ.productos.forEach(element => {
         showProduct(element, cartOBJ.moneda);
      })
      calcSubtotal(cartOBJ)
   }
   initInputs();
}

function setMode() {
   if (mode == "oscuro")
      body.className = "darkmode"
   else
      body.className = ""
}

// ----------- 
// ----> Instrucciones
// ----------- 
setMode();  
initPurchaseProcess();
