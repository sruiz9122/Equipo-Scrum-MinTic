import { initializeApp } from "firebase/app";
// Referencia  a la base de dattos
import { getFirestore } from 'firebase/firestore';
// Referencia a la autenticación
import { getAuth } from 'firebase/auth';
// interacción con la Base de datos
// getDoc trae una las colecciones
// query para restricciones de consulta
import { getDoc, doc } from 'firebase/firestore'; //Para manejar asincronia 




// 3
// Función para consultar registrodatos
// Uso getDoc y doc
const consultarDocumentoDataBase = async (nombreColeccion, id) => {
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
        const respuesta = await getDoc(doc(database, nombreColeccion, id))
        // console.log(respuesta); 



        const documentoTemporal = {
            id: respuesta.id,
            ...respuesta.data()
        }
        console.log(documentoTemporal);

        return documentoTemporal;

    } catch (e) {
        throw new Error(e)
    }

}
export default consultarDocumentoDataBase;