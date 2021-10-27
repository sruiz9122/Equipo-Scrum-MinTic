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
  where, 
  setDoc
} from "firebase/firestore";

//DB Rirebase Courageous
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
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
    //console.log("response.docs: ", response.docs);//Testing
    const elementos = response.docs.map((doc) => {
      const document = {
        id: doc.id,
        ...doc.data(),
      };
      return document;
    });
    //console.log(elementos);//Testing
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
    // console.log("elementos.doc de response: ", elementos);
    // console.log('Vista del  Documento: ', document)
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

// crear documento
export const crearDocumento = async( llaveId, correoLogin, nombreUser )=>{
  const nuevoDocumento = await setDoc(doc(database, llaveId, 'datos' ), {
  correo:correoLogin,
  estado: 'autorizado',
  id: llaveId,
  nombre: nombreUser,
  rol: 'Vendedor'
  })
  console.log( nuevoDocumento)
}  ;