import React from 'react';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { firebase } from 'components/firebaseConfig';
import firebase from '../components/firebase';
import usuarioLogin from 'media/user.png';
// import googleImagen from 'media/google.png'
import 'styles/Login.css'

const Login = () => {


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
        // document.getElementById('LoginScreen').style.display="none"
        // document.getElementById('dashboard').style.display="block"
        // showUserDetails(res.user)
      })
      .catch((err) => {
        console.log(err);
        // const error = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
      })
  }

  return (

    <div className= "fondo">
        {/* <button onClick={LoginConFirebase} type="submit" className="btn btn-danger">Iniciar sesión con Google</button> */}

      {/* <div className="modal-dialog text-center"> */}
        <div  className="col-sm-8 main-section text-center align-items-center">
          {/* <div className="modal-content"> */}
          <h2>Bienvenido a Venta de Gasolina Courageous</h2>
<hr/>
<hr/>
            <div className="col-12 col-sm user-img dos">
              <img src={usuarioLogin} alt="ImagénLogin" />

            </div>
            <button onClick={LoginConFirebase} type="submit" className="btn btn-primary">Iniciar sesión con Google</button>

            <form className="col-12 col-sm" method="get">
              <br />
              {/* <div id="LoginScreen">
                <button id="login" type="submit" className="btn btn-danger" onClick={LoginConFirebase}> <img src={googleImagen}
                  width="32" alt="GoogleLoginImagen" />Google</button>
              </div> */}

              {/* <div id="dashboard">
                                <div id="userDetails"></div>
                                <button id="logout" className="btn btn-light">Cerrar sesión</button>
                            </div> */}
              {/* <div className="col-12 col-sm forgot">
                                <Link exact to="/">Registrarse</Link>
                            </div> */}
            </form>

          {/* </div> */}
        </div>
      {/* </div> */}



    </div>
  )
}
export default Login


