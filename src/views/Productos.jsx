import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { consultarDatabase } from 'config/firebaseCourageous';
import { Loading } from 'components/Loading';

import PublicLayout from 'layout/PublicLayout';

export const Productos = ({ rol }) => {
  const [listaProductos, setListaProductos] = useState([]);
  const [loading, setLoading] = useState(false);

  //filtros de búsqueda
  const [filtroId, setFiltroId] = useState('');
  const [filtroDescripcion, setFiltroDescripcion] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const cargarProductos = async () => {
    setLoading(true);
    const listaTemporal = await consultarDatabase('productos');
    // console.log(listaTemporal);
    setListaProductos(listaTemporal);
    setLoading(false);
  };
  // cargarProductos()

  useEffect(() => {
    if (rol === 'Administrador') {
      cargarProductos();
    }
  }, []);

  //Effect que está pendiente del cambio en input de ID, si hay texto en el value desactiva el input de Descripción
  useEffect(() => {
    if (filtroId != '') {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [filtroId]);

  return (
    <>
      <PublicLayout>
        {rol==='Administrador'?
        <div className='container px-5 pt-4'>
          {loading ? (
            <Loading />
          ) : (
            <>
              <h1>
                Lista Productos
                <Link
                  to='/productos/create'
                  className='btn btn-outline-success float-end'
                >
                  Adicionar Producto
                </Link>
              </h1>
              <h5>Filtrar:</h5>
              <input
                type='text'
                placeholder='Busca por Id...'
                onChange={(e) => {
                  setFiltroId(e.target.value);
                }}
              />
              <input
                disabled={isDisabled ? 'disabled' : ''}
                type='text'
                placeholder='Busca por descripción...'
                onChange={(e) => {
                  setFiltroDescripcion(e.target.value);
                }}
              />
              <hr />
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Id</th>
                    <th scope='col'>Descripcion</th>
                    <th scope='col'>Estado</th>
                    <th scope='col'>Valor</th>
                    <th scope='col'>Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {listaProductos
                    .filter((val) => {
                      if (filtroDescripcion == '' && filtroId == '') {
                        return val;
                      } else if (filtroId !== '') {
                        if (
                          val.id.toLowerCase().includes(filtroId.toLowerCase())
                        ) {
                          return val;
                        }
                      } else if (
                        val.descripcion
                          .toLowerCase()
                          .includes(filtroDescripcion.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((producto, index) => (
                      <tr key={producto.id}>
                        <th scope='row'>{index + 1}</th>
                        <td>{producto.id}</td>
                        <td>{producto.descripcion}</td>
                        <td>{producto.estado}</td>
                        <td>{producto.valor}</td>
                        <td>
                          <Link
                            className='btn btn-outline-primary btn-sm'
                            to={`/productos/${producto.id}`}
                          >
                            Editar
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
        </div>
        :
        <div className='container px-5 pt-4'>
        <div className="h4">No estás autorizado para la página: PRODUCTOS</div>          

      </div>
        }
      </PublicLayout>
    </>
  );
};
