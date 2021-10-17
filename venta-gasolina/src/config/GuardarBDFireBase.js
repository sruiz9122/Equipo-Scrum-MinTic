import { initializeApp } from "firebase/app";
// Referencia  a la base de dattos
import { getFirestore } from 'firebase/firestore';
// Referencia a la autenticación
import { getAuth } from 'firebase/auth';
// interacción con la Base de datos
// getDocs trae todas las colecciones
// query para restricciones de consulta
import { addDoc, collection, getDocs, query, getDoc, doc } from 'firebase/firestore'; //Para manejar asincronia 


// Configuración del API
const firebaseConfig = {
    apiKey: "AIzaSyAefc0z24es6ZxuyByHtHq1Ge3g1aZ1w5Y",
    authDomain: "venta-gasolina.firebaseapp.com",
    projectId: "venta-gasolina",
    storageBucket: "venta-gasolina.appspot.com",
    messagingSenderId: "409892502100",
    appId: "1:409892502100:web:395dc3450c02975d4b4bc1"
};

//   Inicialización del apiKey
const app = initializeApp(firebaseConfig);
// Base de datos
const database = getFirestore();
// Autenticación
const auth = getAuth();

// 1
// Guardar base de datos - función asincrona
// data es un objeto 
const guardarDataBase = async (nombreColeccion, data) => {
    // Try flujo correcto - catch para manejar errores
    try {
        const respuesta = await addDoc(collection(database, nombreColeccion), data)
        console.log(respuesta);

    } catch (e) {
        // Errores pueden ser tipo no tener credenciales
        // No estar habilitado
        // No hay una base creada
        throw new Error(e)
        return e;
    }
}

export default guardarDataBase;