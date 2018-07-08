let btnLogin = document.getElementById("btnLogin");
let btnLogout = document.getElementById("btnLogout");
let ref = firebase.database().ref("usuario");

let usuario = {};

let datosPerfil = document.getElementById("datosPerfil")
let formularioPerfil = document.getElementById("formularioPerfil");
let perfilNombre = document.getElementById("perfilNombre")
let perfilEmail = document.getElementById("perfilEmail")
let perfilTelefono = document.getElementById("perfilTelefono")
let perfilDireccion = document.getElementById("perfilDireccion")
let perfilEditar = document.getElementById("perfilEditar")

let cancelForm = document.getElementById("cancelForm")
// Botones del Form
let nombreForm = document.getElementById("nombreForm");
let emailForm = document.getElementById("emailForm");
let telefonoForm = document.getElementById("telefonoForm");
let calleForm = document.getElementById("calleForm");
let interiorForm = document.getElementById("interiorForm");
let coloniaForm = document.getElementById("coloniaForm");
let cpForm = document.getElementById("cpForm");

function leerInformacion(uid){
  ref.child(uid).on('value', function(data){
    let dat = data.val()
    llenarInformacion(dat.nombre, dat.email, dat.telefono, dat.direccion);
  })
}

function llenarInformacion(nombre, email, telefono, direccion){
  console.log(nombre, email);
  perfilNombre.innerHTML = nombre;
  perfilEmail.innerHTML = email;
  perfilTelefono.innerHTML = telefono;
  perfilDireccion.innerHTML = `${direccion.calle}, ${direccion.interior}`;
}



firebase.auth().onAuthStateChanged(function(user) {
  if(user) {
    console.log("tenemos usuario");
    mostrarLogout();
    leerInformacion(user.uid);
  } else {
    window.location.href = "index.html";
    console.log("no tenenmos usuario");
    mostrarLogin();
  }
})

btnLogout.addEventListener("click", function(event){
  event.preventDefault();
  firebase.auth().signOut()
  .then(function(){
    alert("Se ha cerrado la sesion");
  })
})


function mostrarLogout(){
  console.log("funcion logout");
  btnLogout.style.display = "block";
  btnLogin.style.display = "none";
}

function mostrarLogin() {
  console.log("funcion login");
  btnLogout.style.display = "none";
  btnLogin.style.display = "block";
}

function agregarUsuario(usuario){
  ref.child(usuario.uid).update(usuario)
}

perfilEditar.addEventListener("click", function(event){
  console.log("editar")
  datosPerfil.style.display = "none";
  formularioPerfil.style.display = "block";
})


cancelForm.addEventListener("click", function(event){
  console.log("cancel");
  datosPerfil.style.display = "block";
  formularioPerfil.style.display = "none";
})

function editarDatos(){
  event.preventDefault();
  let uid = firebase.auth().currentUser.uid;
  console.log("editar datos")
  let obj = {
    nombre: nombreForm.value,
    email: emailForm.value,
    telefono: telefonoForm.value,
    direccion: {
      calle: calleForm.value,
      interior: interiorForm.value,
      colonia: coloniaForm.value,
      cp: cpForm.value
    }
  }

  ref.child(uid).update(obj).then(function(){
    datosPerfil.style.display = "block";
    formularioPerfil.style.display = "none";
  });
}