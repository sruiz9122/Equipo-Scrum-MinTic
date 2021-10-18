// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';



//import 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyAefc0z24es6ZxuyByHtHq1Ge3g1aZ1w5Y",
  authDomain: "venta-gasolina.firebaseapp.com",
  projectId: "venta-gasolina",
  storageBucket: "venta-gasolina.appspot.com",
  messagingSenderId: "409892502100",
  appId: "1:409892502100:web:395dc3450c02975d4b4bc1"
};

// firebase.initializeApp(firebaseConfig);

const firebase = initializeApp(firebaseConfig);


export default firebase;


