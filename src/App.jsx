import { Venta } from 'components/Venta';
import { Productos } from 'views/Productos';
import { Producto } from 'components/Producto';
import { UsuarioFiltrado } from './views/UsuarioFiltrado';
// 1. Prueba para eliminar bug
// import Footer from 'components/Footer.jsx'
// import Header from './components/Header';

// export default App;

import './App.css';
import React, { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from 'views/Login';
import { Ventas } from 'views/Ventas';
import Usuarios from 'views/Usuarios';
import { buscarDocumentoFiltrado } from 'config/firebaseCourageous';
import SinPermisos from './views/NoEncontrada';
import NoEncontrada from 'views/NoEncontrada';
import StagingArea from './views/StagingArea';

function App() {
  const [isUsersignedIn, setIsUserSignedIn] = useState(true);
  const [rolUser, setRolUser] = useState('');
  let tempUser = '';

  const handleRol = async (usuario) => {
    tempUser = await buscarDocumentoFiltrado('usuarios', usuario.uid);
    setRolUser(tempUser.rol);
  };

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      handleRol(user);
      return setIsUserSignedIn(true);
    }

    setIsUserSignedIn(false);
  });
  console.log();
  if (isUsersignedIn === true) {
    if (rolUser !== '') {
      if (rolUser === 'Vendedor') {
        return (
          <>
            <Router>
              <Switch>
                <Route exact path='/ventas' component={Ventas} />
                <Route exact path='/ventas/:id' component={Venta} />
                <Route exact path='/productos' render={ (props) => <Productos rol={rolUser} /> } />                               
                <Route exact path='/Usuarios' render={ (props) => <Usuarios rol={rolUser} />} />
                <Route exact path='/' component={Ventas} />
                <Route exact path='*' component={NoEncontrada} />
              </Switch>
            </Router>
          </>
        );
      }else if(rolUser === 'Administrador'){
        return (
          <>
            <Router>
              {/* <Header /> */}
              <Switch>
                <Route exact path='/ventas' component={Ventas} />
                <Route exact path='/ventas/:id' component={Venta} />
                <Route exact path='/productos' render={ (props) => <Productos rol={rolUser} />}/>
                <Route exact path='/productos/:id' component={Producto} />
                <Route exact path='/Usuarios/:id' component={UsuarioFiltrado} />
                <Route exact path='/Usuarios' render={ (props) => <Usuarios rol={rolUser} />}  />
                <Route exact path='/' component={Ventas} />
                <Route exact path='*' component={NoEncontrada} />
              </Switch>
              {/* <Footer/> */}
            </Router>
          </>
        );
      }else{
        return(
          <>
          <Router>
            {/* <Header /> */}
            <Switch>
              <Route exact path='/' component={StagingArea} />
              <Route exact path='*' component={StagingArea} />
            </Switch>
            {/* <Footer/> */}
          </Router>
        </>

        )
      }
      
    } else {
      return (
        <Router>
          <Switch>
          {/* <Route exact path='/ventas' component={Ventas} /> */}
          </Switch>
        </Router>
      );
    }
  } else {
    return (
      <Router>
        <Switch>
          <Route path='/' component={Login} />
        </Switch>
      </Router>
    );
  }
}
export default App;
