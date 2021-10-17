import React from 'react';
// Estilos propios css
import 'styles/Login.css';
// React-router-dom
import {Link} from 'react-router-dom';
// Import images;
import usuarioLogin from 'media/user.png';
import googleImagen from 'media/google.png'
// 




const Login = () => {
    return (
        <>
            <div className="modal-dialog text-center">
                <div className="col-sm-8 main-section">
                    <div className="modal-content">
                        <div className="col-12 col-sm user-img">
                            <img src={usuarioLogin} alt="ImagénLogin" />

                        </div>
                        <form className="col-12 col-sm"  method="get">
                            <br/>
                            <button type ="submit" className ="btn btn-primary"><i className ="fas fa-sign-in-alt"></i> Ingresar
                            </button>

                            <div id="LoginScreen">
                            <button id="login" type ="submit" className ="btn btn-danger"> <img src={googleImagen}
                            width="32" alt="GoogleLoginImagen"/>Google</button>
                            </div>

                            <div id="dashboard">
                            <div id="userDetails"></div>
                            <button id="logout" className ="btn btn-light">Cerrar sesión</button>
                            </div>
                            <div className ="col-12 col-sm forgot">
                            <Link exact to="/">Registrarse</Link>
                            </div>
                        </form>

                    </div>
                </div>
            </div>



        </>
    )
}

export default Login
