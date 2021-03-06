import { consultarDatabase } from 'config/firebaseCourageous';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import PublicLayout from 'layout/PublicLayout';

import 'styles/Usuarios.css';

const Usuarios = ({ rol }) => {
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [filtroRol, setFiltroRol] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  // Funciones
  const cargaUsuarios = async () => {
    const listaTemp = await consultarDatabase('usuarios');
    setListaUsuarios(listaTemp);
  };

  useEffect(() => {
    if (rol === 'Administrador') {
      cargaUsuarios();
    }
  }, []);

  return (
    // <div classNameName="container mt-5">
    //     <h1 classNameName="mb-5">Maestro de usuarios</h1>
    //     <a classNameName="btn btn-primary" href="./listar_usuarios.html" role="button">Actualizar (rol/estado) de usuario</a>
    // </div>
    <>
      <PublicLayout>
      {rol==='Administrador'?
        <div className='container'>
          <div>
            {/* <!-- Titulo --> */}
            <h3 className='h3 py-2' align='right'>
              Actualizar (Rol/Estado) de usuario
            </h3>
          </div>
          <form action='' className="container">
            {/* <!-- Opciones de Búsqueda --> */}
            <div className='input-group  mb-3'>
              <select
                name='estado'
                id='estadoUsuario'
                className='form-control'
                placeholder='Estado'
                aria-label='Estado'
                aria-describedby='basic-addon2'
                onChange={(e) => {
                  setFiltroRol(e.target.value);
                }}
              >
                <option value=''>Seleccione Rol</option>
                <option value='Administrador'>Administrador</option>
                <option value='Vendedor'>Vendedor</option>
              </select>
              <select
                name='estado'
                id='estadoUsuario'
                className='form-control'
                placeholder='Estado'
                aria-label='Estado'
                aria-describedby='basic-addon2'
                onChange={(e) => {
                  setFiltroEstado(e.target.value);
                }}
              >
                <option value=''>Seleccione Estado</option>
                <option value='pendiente'>Pendiente</option>
                <option value='autorizado'>Autorizado</option>
                <option value='noautorizado'>No Autorizado</option>
              </select>
              {/* <!-- Botón --> */}
              <button className='btn btn-dark' onClick={() => cargaUsuarios()}>
                Limpiar
              </button>
            </div>
          </form>
          {/* <!-- Tabla resultado busqueda --> */}
          <table  className='table'>
            <thead className='table-dark'>
              <tr>
                <th scope='col'>Id</th>
                <th scope='col'>Nombre de Usuario</th>
                <th scope='col'>Correo</th>
                <th scope='col'>Rol</th>
                <th scope='col'>Estado</th>
                <th scope='col'>Editar</th>
              </tr>
            </thead>
            <tbody>
              {listaUsuarios
                .filter((val) => {
                  if (filtroRol === '' && filtroEstado === '') {
                    return val;
                  } else if (filtroRol !== '') {
                    if (val.rol === filtroRol) {
                      return val;
                    }
                  } else if (filtroEstado !== '') {
                    if (
                      val.estado.toLowerCase().replace(' ', '') ===
                      filtroEstado.toLowerCase()
                    ) {
                      return val;
                    }
                  }
                })
                .map((usuario) => (
                  <tr key={usuario.id}>
                    <td scope='row' className="text-truncate formatCelda">{usuario.id}</td>
                    <td >{usuario.nombre}</td>
                    <td className="text-truncate formatCelda">{usuario.correo}</td>
                    <td>{usuario.rol}</td>
                    <td>{usuario.estado}</td>
                    <td>
                      <Link
                        className='btn btn-dark'
                        to={`/usuarios/${usuario.id}`}
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        :
        <div className='container px-5 pt-4'>
          <div className="h4">No estás autorizado para la página: USUARIOS</div>          

        </div>
        }
      </PublicLayout>
    </>
  );
};

export default Usuarios;
