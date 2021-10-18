// 
import React from 'react';

//import auth from '../components/firebaseConfig';

import '../App.css';
import { getAuth } from '@firebase/auth';

const Home = () => {
  const signOut =()=>{
    const auth = getAuth();
    auth.signOut();
  }
  return (
    <>
   
      <h1>Bienvenido,has ingresado a la App </h1>
      


      
      <button onClick={signOut} >Sign out</button>
    </>
  )
}

export default Home;