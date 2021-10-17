import { initializeApp } from "firebase/app";
// Referencia  a la base de dattos
import { getFirestore } from 'firebase/firestore';
// Referencia a la autenticación
import { getAuth } from 'firebase/auth';
// interacción con la Base de datos
// getDocs trae todas las colecciones
// query para restricciones de consulta
import { collection, getDocs, query,  } from 'firebase/firestore'; //Para manejar asincronia 



const consultarDataBase = async (nombreColeccion) => {
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
    try {
        // Query sirve para poner restriciones a la BD
        const respuesta = await getDocs(query(collection(database, nombreColeccion)))
        // console.log(respuesta); 
        // Como es un array usamos map para tranformar los datos

        const coleccionDatos = respuesta.docs.map((documento) => {
            // console.log(documento.data());

            const documentoTemporal = {
                id: documento.id,
                ...documento.data()
            }
            // console.log(documentoTemporal);
            return documentoTemporal;
        })

        return coleccionDatos;

    } catch (e) {
        throw new Error(e)
    }

}

export default consultarDataBase;