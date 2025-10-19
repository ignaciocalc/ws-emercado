/*
LOGICA
1) Obtener los datos del formulario y cargarlos al local storage [R]
2) Setear datos [R]
    2.1) En los campos como placeholder [R]
    2.2) En la letra para el perfil [R]
    2.3) Al lado de la letra en mi perfil [R]
3) Implementar logicas de la foto de perfil [R]
    3.1) Guardarla en Local Storage [R]
    3.2) Investigar tema peso y almacenamiento
    3.3) Crear PopUp para seleccionarla y recortarla en forma
    de circulo
    3.5) Ponerla en todos lados
*/

const   nombre          = document.getElementById("perfil-inputNombre"),
        apellido        = document.getElementById("perfil-inputApellido"),
        tel             = document.getElementById("perfil-inputTel"),
        correo          = document.getElementById("perfil-inputEmail"),
        btnConfirmar    = document.getElementById("perfil-btnConfirmar"),
        userDir         = localStorage.getItem('user'),
        letraFoto       = document.getElementById("perfil-letraFoto"),
        contenedorImg   = document.getElementById("perfil-contenedorCircularImg"),
        imgPerfil       = document.getElementById("perfil-fotoPerfil"),
        inputFile       = document.getElementById("perfil-inputFile");
const //popUp
    perfilPopUp = document.getElementById("perfil-popUp"),
    imgPopUp = document.getElementById("perfil-popUp-img"),
    popUpbtnConfirmar = document.getElementById("perfil-popUp-confirmar"),
    popUpbtnDescartar = document.getElementById("perfil-popUp-descartar"),
    popUpbtnSelect = document.getElementById("perfil-popUp-seleccionar");


if(userDir == null){
    alert("no deberías estar aquí");
    window.location = "index.html";
}
    
let user = JSON.parse(userDir),
    etiquetaUsuario = document.getElementById("perfil-nombreUsuario");

// seteo la foto si esta guardada en local storage o no    
if((user.img != undefined) && (user.img != "")){
    imgPerfil.style.display = "block";
    imgPerfil.src = user.img;
    letraFoto.style.display = "none";
} else {
    letraFoto.style.display = "block";
    letraFoto.textContent       = user.email.substring(0, 1).toUpperCase();
    imgPerfil.style.display     = "none";
}

if(user.nombre !== undefined){
    nombre.placeholder          = user.nombre       !== ''  ? user.nombre   : "Introduzca su nombre";
    apellido.placeholder        = user.apellido     !== ''  ? user.apellido : "Introduzca su apellido";
    correo.placeholder          = user.email        !== ''  ? user.email    : "Introduzca su email";
    tel.placeholder             = user.tel          !== ''  ? user.tel      : "Introduzca su telefono";
    etiquetaUsuario.textContent = user.nombre       !== ''  ? user.nombre   : user.email;
    
} else {
    correo.placeholder          = user.email;
    etiquetaUsuario.textContent = user.email;
}



btnConfirmar.addEventListener("click", ()=>{
    // let user = JSON.parse(userDir);
    
    let nombre1     = nombre.value;
    let apellido1   = apellido.value;
    let tel1        = tel.value;
  
    let correoFinal, nombreFinal, apellidoFinal, telFinal;

    // if(user.nombre !== undefined && nombre == ''){
    //     nombreFinal = user.nombre;
    // } else {
    //     nombreFinal = nombre;}

    //   ||||||||
    //   vvvvvvvv es la misma logica que ese if
    nombreFinal     = (user.nombre      !== undefined && nombre1    == '') ? user.nombre    : nombre1;
    apellidoFinal   = (user.apellido    !== undefined && apellido1  == '') ? user.apellido  : apellido1;
    telFinal        = (user.tel         !== undefined && tel1       == '') ? user.tel       : tel1;

    if(correo.validity.valid && correo.value != ''){
        correoFinal = correo.value;
    } else {
        correoFinal = user.email;
    }

    // esto debería pasar siempre porque no se puede acceder a mi usuario sin estar registrado

    let res ={
            nombre   : nombreFinal, 
            apellido : apellidoFinal,
            email    : correoFinal,
            tel      : telFinal,
            img     : ''
            };         


    localStorage.setItem('user', JSON.stringify(res));
})

contenedorImg.addEventListener("click", ()=> {
    inputFile.click();
})

inputFile.addEventListener("change", cargarImagen);

function cargarImagen(){
    const   file = inputFile.files[0],
            lector = new FileReader();

    lector.addEventListener("load", () => {
        let resultado = lector.result;
        const imgMB = 4 * 1024 * 1024;

        if ((file.size < imgMB) && file.type.startsWith('image/')) {
            perfilPopUp.className = "perfil-popUp-valido";
            imgPopUp.src = resultado;
            inputFile.value = ""
        } else {
            if (!file.type.startsWith('image/')) {
                alert("Debe cargar una imagen");
                inputFile.value = ""
            } else {
                perfilPopUp.className = "perfil-popUp-invalido";
                imgPopUp.src = resultado;
                inputFile.value = ""
            }
        }    
    })

    if(file){
        lector.readAsDataURL(file);
    }
}


perfilPopUp.addEventListener("click", function(evento){
    if (evento.target == perfilPopUp){
        imgPopUp.src = "";
        perfilPopUp.className = "perfil-popUp-ocultar"
    }
})

popUpbtnSelect.addEventListener("click", ()=> {
    inputFile.click();
})

popUpbtnDescartar.addEventListener("click", function(){
    imgPopUp.src = "";
    perfilPopUp.className = "perfil-popUp-ocultar"
})

popUpbtnConfirmar.addEventListener("click", function(){
    imgPerfil.src = imgPopUp.src;
    user.img = imgPopUp.src;
    imgPopUp.src = "";
    imgPerfil.style.display = "block";
    letraFoto.style.display = "none";
    perfilPopUp.className = "perfil-popUp-ocultar"
    localStorage.setItem('user', JSON.stringify(user));
})