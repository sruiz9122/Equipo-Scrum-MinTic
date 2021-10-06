// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDU18oKq0-KUp5Bj2aJtUzGkwTwGJQ4jt0",
    authDomain: "ventagasolinamstic.firebaseapp.com",
    projectId: "ventagasolinamstic",
    storageBucket: "ventagasolinamstic.appspot.com",
    messagingSenderId: "606293734557",
    appId: "1:606293734557:web:ee303187d7fa1d4ccb5074",
    measurementId: "G-HNKHCZ4N9Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


let strDescPrd = document.getElementById("inputDescripcionProducto")
let numValor = document.getElementById("inputValorUnitarioProducto")
let strEstado = document.getElementById("inputEstadoProducto")

let boton = document.getElementById('botonRegistrarProducto');

boton.addEventListener("click", datosEntrada)

function datosEntrada() {
    console.clear()

    let descProd = strDescPrd.value
    let valorUni = numValor.value
    let estado = strEstado.value

    if (estado == 1) {
        estado = `Disponible`
    } else if (estado == 2) {
        estado = `No Disponible`
    }


    console.log(descProd, `$ ${valorUni}`, estado)


    app.collection("productos").add({
        descripcion: descProd,
        valor: valorUni,
        estado: estado
    })
        .then(function (docRef) {
            console.log(`Producto registrado: ${docRef.id}`);
        })
        .catch(function (error) {
            console.error(`Error: ${error}`)
        })

}

//boton.click();
// boton.click()==undefined ?console.log("es undefined") : console.log("Falso")
/*if(boton.onclick){
    alert("click con datos");
}*/
//boton.onclick = () => { console.log("click", datosEntrada); }


