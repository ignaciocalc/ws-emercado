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
        userDir         = localStorage.getItem('user'),
        letraFoto       = document.getElementById("perfil-letraFoto"),
        contenedorImg   = document.getElementById("perfil-contenedorCircularImg"),
        imgPerfil       = document.getElementById("perfil-fotoPerfil"),
        inputFile       = document.getElementById("perfil-inputFile"),
        etiquetaUsuario = document.getElementById("perfil-nombreUsuario"),
        imgHeader       = document.getElementById("header-fotoPerfil"),
        imgHeaderimg    = document.getElementById("header-fotoPerfilMobile"),
        spanMobile      = document.getElementById("contenidoUserCel"),
        spanSem         = document.getElementById("contenidoUser");


const //popUp
    perfilPopUp = document.getElementById("perfil-popUp"),
    imgPopUp = document.getElementById("perfil-popUp-img"),
    popUpbtnConfirmar = document.getElementById("perfil-popUp-confirmar"),
    popUpbtnDescartar = document.getElementById("perfil-popUp-descartar"),
    popUpbtnSelect = document.getElementById("perfil-popUp-seleccionar"),
    btnEditar = document.getElementById("perfil-botonEditar");

const //eliminar foto de perfil
    imagenAux = document.getElementById("perfil-imgDescriptiva"),
    btnImagenAux = document.getElementById("perfil-ImgCamEdit");

if(userDir == null){
    alert("No deberías estar aquí");
    window.location = "index.html";
}
    
let user = JSON.parse(userDir);

// seteo la foto si esta guardada en local storage o no    
if((user.img != undefined) && (user.img != "")){
    imgPerfil.style.display = "block";
    imgPerfil.src = user.img;
    letraFoto.style.display = "none";
    if (window.matchMedia("(max-width: 769px)").matches) 
            imagenAux.src = 'img/delete.svg';
} else {
    letraFoto.style.display = "block";
    letraFoto.textContent       = user.email.substring(0, 1).toUpperCase();
    imgPerfil.style.display     = "none";
}

if(user.nombre !== undefined){
    nombre.value          = user.nombre       !== ''  ? user.nombre   : "Introduzca su nombre";
    apellido.value        = user.apellido     !== ''  ? user.apellido : "Introduzca su apellido";
    correo.value          = user.email        !== ''  ? user.email    : "Introduzca su email";
    tel.value             = user.tel          !== ''  ? user.tel      : "Introduzca su telefono";
    if (user.nombre != ""){
        etiquetaUsuario.textContent = user.nombre;
        if ((user.apellido != undefined) & (user.apellido != ""))
            etiquetaUsuario.textContent = user.nombre + " " + user.apellido
    }  
} else {
    correo.placeholder          = user.email;
    etiquetaUsuario.textContent = user.email;
}



// function guardarDatos(){
//     // let user = JSON.parse(userDir);
    
//     let nombre1     = nombre.value;
//     let apellido1   = apellido.value;
//     let tel1        = tel.value;
  
//     // if(user.nombre !== undefined && nombre == ''){
//     //     nombreFinal = user.nombre;
//     // } else {
//     //     nombreFinal = nombre;}

//     //   ||||||||
//     //   vvvvvvvv es la misma logica que ese if
//     user.nombre     = (user.nombre      !== undefined && nombre1    == '') ? user.nombre    : nombre1;
//     user.apellido   = (user.apellido    !== undefined && apellido1  == '') ? user.apellido  : apellido1;
//     user.tel        = (user.tel         !== undefined && tel1       == '') ? user.tel       : tel1;

//     localStorage.setItem('user', JSON.stringify(res));
// }

btnImagenAux.addEventListener('mouseover', function(){
    if (imgPerfil.style.display != "none")
        imagenAux.src = 'img/delete.svg'
})

btnImagenAux.addEventListener('mouseout', function(){
    imagenAux.src = 'img/camara.svg'
})

contenedorImg.addEventListener("click", (evento)=> {
    if ((imgPerfil.style.display == "none") || evento.target == imgPerfil){
        inputFile.click();
    } else if ((evento.target == btnImagenAux) || (evento.target == imagenAux)) {
        const
            user = JSON.parse(localStorage.getItem("user"));

        user.img = "";
        localStorage.setItem("user", JSON.stringify(user));
        window.location.reload();
    }
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
    imgHeaderimg.src = user.img;
    imgHeader.src = user.img;
    imgPopUp.src = "";
    imgPerfil.style.display = "block";
    letraFoto.style.display = "none";
    spanSem.style.display = "none";
    spanMobile.style.display = "none";
    imgHeader.style.display = "block";
    imgHeaderimg.style.display = "block";
    perfilPopUp.className = "perfil-popUp-ocultar";
    localStorage.setItem('user', JSON.stringify(user));
    if (window.matchMedia("(max-width: 769px)").matches) 
            imagenAux.src = 'img/delete.svg';
})

//edicion de datos (boton editar)
btnEditar.addEventListener('click', function(){
    const 
        editando = btnEditar.getAttribute("editando"),
        inputs = [nombre, apellido, tel],
        nombreVal = nombre.value,
        apellidoval = apellido.value,
        telVal = tel.value;

    if (editando == "false"){
        btnEditar.setAttribute("editando", "true")
        inputs.forEach((input)=> {input.className="perfil-inputEditando"; input.removeAttribute("readonly")});
        btnEditar.src = "/img/check.svg";
    } else if ((nombreVal != "") && (apellidoval != "") && (telVal != "")){
        user.nombre = nombreVal;
        user.apellido = apellidoval;
        user.tel = telVal;
        btnEditar.setAttribute("editando", "false");
        inputs.forEach((input)=> {input.className="perfil-inputConfirmado"; input.setAttribute("readonly", "")});
        btnEditar.src = "/img/editar-boton.svg";
        etiquetaUsuario.textContent = user.nombre + " " + user.apellido
        localStorage.setItem('user', JSON.stringify(user));
    } else{
        inputs.forEach((input)=> input.className="perfil-inputEditando");
        if (nombreVal == "")
            nombre.className = "perfil-inputError";
        if (apellidoval == "")
            apellido.className = "perfil-inputError";
        if (telVal == "")
            tel.className = "perfil-inputError";
    } 
}) 