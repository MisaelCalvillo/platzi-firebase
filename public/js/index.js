let btnLogin = document.getElementById("btnLogin");
let btnLogout = document.getElementById("btnLogout");

let ref = firebase.database().ref("usuario");

let usuario = {};

firebase.auth().onAuthStateChanged(function(user) {
  if(user) {
    console.log("tenemos usuario");
    mostrarLogout();
  } else {
    console.log("no tenenmos usuario");
    mostrarLogin();
  }
})

btnLogin.addEventListener("click", function(event){
  event.preventDefault();

  // let provider = new firebase.auth.GoogleAuthProvider()
  let provider = new firebase.auth.FacebookAuthProvider()
  provider.addScope('public_profile');

  firebase.auth().signInWithPopup(provider)
  .then(function(datosUsuario) {
    console.log(datosUsuario);
    usuario = {
      nombre: datosUsuario.user.displayName,
      email: datosUsuario.user.email,
      uid: datosUsuario.user.uid
    }
    agregarUsuario(usuario, usuario.uid);
  })
  .catch(function(error){
    if (error) {
      alert(error.message)
    }
  })
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

function agregarUsuario(usuario, id){
  ref.child(id).update(usuario)
}