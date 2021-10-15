import React from 'react'
import logo from "./../media/LOGO_TRANS_2.svg"
const Header = () => {
    return (
        <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <div className="container">
            <a className="navbar-brand" href="#"><img src={logo} alt="LogoCourageous" height="50px"/></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse text-nowrap text-center" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active d-flex " aria-current="page" href="./maestroVentas.html">Maestro Ventas</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active d-flex" href="./maestroProductos.html">Maestro Productos</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active d-flex" href="./maestroUsuarios.html">Maestro usuarios</a>
                </li>
                
                
                
              </ul>
              <div className="navbar-nav nav-item container d-flex flex-wrap justify-content-end  ">
                <a href="#" className="d-none d-sm-block link-dark text-decoration-none perfil-img-interna"  >
                  <img  src="https://github.com/mdo.png" alt="mdo" width="40" height="40" className="rounded-circle imagen-logo "  />
                </a>
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
