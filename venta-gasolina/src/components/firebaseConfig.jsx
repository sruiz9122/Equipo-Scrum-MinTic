import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
    collection,
    getDocs,
    getDoc,
    query,
    doc,
    addDoc,
    deleteDoc,
    updateDoc,
    where
} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAefc0z24es6ZxuyByHtHq1Ge3g1aZ1w5Y",
    authDomain: "venta-gasolina.firebaseapp.com",
    projectId: "venta-gasolina",
    storageBucket: "venta-gasolina.appspot.com",
    messagingSenderId: "409892502100",
    appId: "1:409892502100:web:395dc3450c02975d4b4bc1"
};
initializeApp(firebaseConfig);
const database = getFirestore();

// Guardar
export const guardarDatabase = async (nombreDatabase, data) => {
    try {
        const response = await addDoc(collection(database, nombreDatabase), data);
        console.log(response);
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Consultar todos los documentos (Coleccion)
export const consultarDatabase = async (nombreDatabase) => {
    try {
        const response = await getDocs(query(collection(database, nombreDatabase)));
        const elementos = response.docs.map((doc) => {
            const document = {
                id: doc.id,
                ...doc.data(),
            };
            return document;
        });
        console.log(elementos);
        return elementos;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Consultar un documento
export const consultarDocumentoDatabase = async (nombreDatabase, id) => {
    try {
        const response = await getDoc(doc(database, nombreDatabase, id));
        const document = {
            id: response.id,
            ...response.data(),
        };
        return document;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Actualizar un documento
export const actualizarDocumentoDatabase = async (nombreDatabase, id, data) => {
    try {
        const response = await updateDoc(doc(database, nombreDatabase, id), data);
        console.log(response);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Actualizar un documento Filtrado Id
export const actualizarDocumentoFiltrado = async (nombreDatabase, id, data) => {
    try {
      const q = query(collection(database, nombreDatabase), where("id", "==", id));
      const response = await getDocs(q);
      response.forEach(async (element) => {
        await updateDoc(doc(database, nombreDatabase, element.id), data);
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

// Eliminar un documento
export const eliminarDocumentoDatabase = async (nombreDatabase, id) => {
    try {
        const response = await deleteDoc(doc(database, nombreDatabase, id));
        console.log(response);
    } catch (error) {
        throw new Error(error.message);
    }
};