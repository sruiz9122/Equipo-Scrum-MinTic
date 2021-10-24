import React, { useState } from 'react'
import logo from "./../media/LOGO_TRANS_2.svg"
import { Link, NavLink } from 'react-router-dom';
import 'styles/Navbar.css'
import { getAuth } from '@firebase/auth';
import { buscarDocumentoFiltrado } from 'config/firebaseCourageous';
import { onAuthStateChanged } from 'firebase/auth';

const Header = () => {
  const [fotoUser, setFotoUser] = useState('');
  const [rolUser, setRolUser] = useState('');
  let tempUser = '';
  const signOut = () => {
    const auth = getAuth();
    auth.signOut();
  }

  const handleRol = async (usuario) => {
    setFotoUser(usuario.photoURL)
    if (fotoUser === '') {
      setFotoUser('https://github.com/mdo.png')
    }
    tempUser = await buscarDocumentoFiltrado('usuarios', usuario.uid)
    setRolUser(tempUser.rol)
  }

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      handleRol(user)
    }
  })

  if (rolUser === 'Vendedor') {
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <div className="container">
            <img src={logo} alt="LogoCourageous" height="50px" />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse text-nowrap text-center" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav_link" aria-current="page" to='/ventas' >Maestro Ventas</NavLink>
                </li>
              </ul>
              <div className="navbar-nav nav-item container d-flex flex-wrap justify-content-end  ">
                <img src={fotoUser} alt="mdo" width="40" height="40" className="rounded-circle imagen-logo " />
                <div className="navbar-nav text-end">
                  <button type="button" className="btn btn-primary" onClick={signOut}>Cerrar Sesión</button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    )
  }
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container">
          {/* <Link classNameprop="navbar-brand" exact to='/'> */}
          <img src={logo} alt="LogoCourageous" height="50px" />
          {/* </Link> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse text-nowrap text-center" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav_link" aria-current="page" to='/ventas' >Maestro Ventas</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav_link" to='/productos' >Maestro Productos</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav_link" to='/usuarios'>Maestro usuarios</NavLink>
              </li>
            </ul>
            <div className="navbar-nav nav-item container d-flex flex-wrap justify-content-end  ">
              {/* <Link href="#" className="d-none d-sm-block link-dark text-decoration-none perfil-img-interna"  > */}
              {/* <img src="https://github.com/mdo.png" alt="mdo" width="40" height="40" className="rounded-circle imagen-logo " /> */}
              <img src={fotoUser} alt="mdo" width="40" height="40" className="rounded-circle imagen-logo " />
              {/* </Link> */}
              <div className="navbar-nav text-end">
                <button type="button" className="btn btn-primary" onClick={signOut}>Cerrar Sesión</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
