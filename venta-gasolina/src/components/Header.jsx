import React from 'react'
import logo from "./../media/LOGO_TRANS_2.svg"
import {Link,NavLink} from 'react-router-dom';
import 'styles/Navbar.css'

const Header = () => {
    return (
        <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <div className="container">
            <Link  classNameprop="navbar-brand" exact to='/'><img src={logo} alt="LogoCourageous" height="50px"/></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse text-nowrap text-center" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink classNameprop="nav-link active d-flex " activeClassName='active' aria-current="page" to='/ventas' style={{ textDecoration: 'none' }}>Maestro Ventas</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink classNameprop="nav-link active d-flex" activeClassName='active' to='/productos' style={{ textDecoration: 'none' }}>Maestro Productos</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink classNameprop="nav-link active d-flex" activeClassName='active' to='/usuarios'style={{ textDecoration: 'none' }}>Maestro usuarios</NavLink>
                </li>
                
                
                
              </ul>
              <div className="navbar-nav nav-item container d-flex flex-wrap justify-content-end  ">
                <Link href="#" className="d-none d-sm-block link-dark text-decoration-none perfil-img-interna"  >
                  <img  src="https://github.com/mdo.png" alt="mdo" width="40" height="40" className="rounded-circle imagen-logo "  />
                </Link>
                <div className="navbar-nav text-end">
                  <button type="button" className="btn btn-primary">Cerrar Sesión</button>
                </div>
              </div>
    
                
              
            </div>
            
          </div>
        </nav>
    
      </header>
    )
}

export default Header
