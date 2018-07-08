let btnLogin = document.getElementById("btnLogin");
let btnLogout = document.getElementById("btnLogout");
let ref = firebase.database().ref("usuario");
let refTest = firebase.database().ref("test");

let usuarion = {};

let btnPush = document.getElementById("btnPush");
let btnUpdate = document.getElementById("btnUpdate");
let btnSet = document.getElementById("btnSet");
let btnRemove = document.getElementById("btnRemove");



btnPush.addEventListener("click", function(){
  let objeto = {
    curso: "firebase",
    profesor: "Misael Calvillo Mancilla",
    contenidos: {
      primero: "autenticacion"
    }
  }
  refTest.push(objeto)
  .then(function() {
    alert("se subió correctamente el objeto");
  }) 
  .catch(function(error){
    alert("hubo un error");
    console.log(error)
  })
});

btnUpdate.addEventListener("click", function(){
  console.log("update")
  let obj = {
    lugar: "Platzi"
  }
  refTest.update(obj)
})

btnSet.addEventListener("click", function(){
  console.log("set")
  let obj = {
    lugarPlatziConf: "Ciudad de México"
  }
  refTest.set(obj).then(function(){
    alert("set");
  }).catch(function(error){
    alert("fallo el set");
    console.log(error);
  });
})

btnRemove.addEventListener("click", function(){
  console.log("remove");
  ref.child("JkAyntWlPWMVmkcI0c4yFL9ESWm1").remove();
})

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
    agregarUsuario(usuario);
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

function agregarUsuario(usuario){
  ref.child(usuario.uid).update(usuario)
}