import { Venta } from "components/Venta";
import { Productos } from 'views/Productos';
import { Producto } from 'components/Producto';
import { UsuarioFiltrado } from './views/UsuarioFiltrado';
// 1. Prueba para eliminar bug
// import Footer from 'components/Footer.jsx'
// import Header from './components/Header';


// export default App;

import './App.css'
import React, { useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import {
  BrowserRouter as Router,
  Switch,
  Route,
}
  from "react-router-dom";
import Login from 'views/Login';
import { Ventas } from 'views/Ventas';
import Usuarios from 'views/Usuarios';
import { buscarDocumentoFiltrado } from "config/firebaseCourageous";


function App() {
  const [isUsersignedIn, setIsUserSignedIn] = useState(true);
  const [rolUser, setRolUser] = useState('');
  let tempUser = '';

  const handleRol = async (usuario) => {
    tempUser = await buscarDocumentoFiltrado('usuarios', usuario.uid)
    setRolUser(tempUser.rol)
  }

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      handleRol(user)
      return setIsUserSignedIn(true);
    }

    setIsUserSignedIn(false);
  })
  console.log();
  if (isUsersignedIn === true) {
    if (rolUser === 'Vendedor') {
      return (
        <>
          <Router>
            <Switch>
              <Route exact path='/ventas' component={Ventas} />
              <Route exact path='/ventas/:id' component={Venta} />
            </Switch>
          </Router>
        </>
      )
    }
    return (
      <>
        <Router>

          {/* <Header /> */}
          <Switch>
            <Route exact path='/ventas' component={Ventas} />
            <Route exact path='/ventas/:id' component={Venta} />
            <Route exact path='/productos' component={Productos} />
            <Route exact path='/productos/:id' component={Producto} />
            <Route exact path="/Usuarios/:id" component={UsuarioFiltrado} />
            <Route exact path='/Usuarios' component={Usuarios} />
          </Switch>
          {/* <Footer/> */}
        </Router>
      </>

    );
  }
  else {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    );
  }
}
export default App;
