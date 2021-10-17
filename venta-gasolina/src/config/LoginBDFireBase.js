
import { signInWithPopup, GoogleAuthProvider, auth } from "firebase/auth";
// Referencia  a la base de dattos
import { getFirestore } from 'firebase/firestore';

import LoginBtn from "views/Login";


import { initializeApp } from "firebase/app";
// // Referencia a la autenticación
// import { getAuth } from 'firebase/auth';



// const auth = getAuth();
// signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });



const firebaseConfig = {
    apiKey: "AIzaSyAefc0z24es6ZxuyByHtHq1Ge3g1aZ1w5Y",
    authDomain: "venta-gasolina.firebaseapp.com",
    projectId: "venta-gasolina",
    storageBucket: "venta-gasolina.appspot.com",
    messagingSenderId: "409892502100",
    appId: "1:409892502100:web:395dc3450c02975d4b4bc1"
};

initializeApp(firebaseConfig);
const authh = auth();


const provider = new GoogleAuthProvider();
// Base de datos
const database = getFirestore();

let usuarioActual;
let listaTareas = []

// Variables DOM
const btnLogin = LoginBtn.document.getElementById("login")


async function Login() {
    const respuesta = await authh.signInWithPopup(provider)
    console.log(respuesta)
}


// Eventos
btnLogin.addEventListener('click', (e) => {
    Login()
})

