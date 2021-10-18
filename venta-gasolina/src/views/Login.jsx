import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebase from '../components/firebase';
import usuarioLogin from 'media/user.png';
import 'styles/Login.css';
import googleImagen from 'media/google.png';
// import imgLogin from 'media/LogoInicio.png';

const Login = () => {

  const history = useHistory();


  const LoginConFirebase = () => {



    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((re) => {
        console.log(re);
        const credential = GoogleAuthProvider.credentialFromResult(re);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = re.user;

      })
      .then(() => {
        history.push('/ventas');
      })
      .catch((err) => {
        console.log(err);

      })
  }

  return (

    <div className="container d-flex flex-column align-items-center justify-content-center pt-5">
      <h2 className='p-5'>Bienvenido a Venta de Gasolina Courageous</h2>
      {/* <button onClick={LoginConFirebase} type="submit" className="btn btn-danger">Iniciar sesión con Google</button> */}
      {/* <div className="modal-dialog text-center"> */}
      {/* <img src={imgLogin} width='600px' alt="Estación Corageous" /> */}
      <div className="col-sm-8 main-section text-center align-items-center">
        {/* <div className="modal-content"> */}
 
        <div className="col-12 col-sm user-img dos">
          <img src={usuarioLogin} width='150px' alt="ImagénLogin" />
          <br/>

        </div>
        {/* <button onClick={LoginConFirebase} type="submit" className="btn btn-primary">Iniciar sesión con Google</button> */}
        <div id="LoginScreen">
          <button id="login" type="submit" className="btn btn-outline-primary m-5" onClick={LoginConFirebase}> <img src={googleImagen}
            width="32" alt="GoogleLoginImagen" />Iniciar sesión con Google</button>
        </div>

        <form className="col-12 col-sm" method="get">
          <br />
        </form>
      </div>
    </div>
  )
}
export default Login


