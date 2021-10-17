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

//DB Rirebase Courageous
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
    console.log("response.docs: ", response.docs);
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
    console.log("response 1 documento: ", response);
    const document = {
      id: response.id,
      ...response.data(),
    };
    console.log("Documento consultado: ", document);
    return document;
  } catch (error) {
    throw new Error(error.message);
  }
};

//Consultar un documento filtrado por: id
export const buscarDocumentoFiltrado = async (nombreDatabase, id) => {
  try {
    let document = '';
    let elementos = '';
    const response = await getDocs(
      query(
        collection(database, nombreDatabase), where("id", "==", id)
      )
    );
    // console.log("response filtrado: ", response);
    elementos = response.docs.map((doc) => {
      document = {
        id: doc.id,
        ...doc.data()
      };

      //console.log("documento filtrado:", document);
      //return document;
    });
    console.log("elementos.doc de response: ", elementos);
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
