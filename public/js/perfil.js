let btnLogin = document.getElementById("btnLogin");
let btnLogout = document.getElementById("btnLogout");
let ref = firebase.database().ref("usuario");

let usuarion = {};

let perfilNombre = document.getElementById("perfilNombre")
let perfilEmail = document.getElementById("perfilEmail")

leerInformacion();

function leerInformacion(){
  ref.child("JkAyntWlPWMVmkcI0c4yFL9ESWm1").on('value', function(data){
    console.log(data.val())
    llenarInformacion(data.val().nombre, data.val().email);
  })
}

function llenarInformacion(nombre, email){
  console.log(nombre, email);
  perfilNombre.innerHTML = nombre;
  perfilEmail.innerHTML = email;
}



firebase.auth().onAuthStateChanged(function(user) {
  if(user) {
    console.log("tenemos usuario");
    mostrarLogout();
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