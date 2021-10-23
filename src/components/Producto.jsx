import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  buscarDocumentoFiltrado,
  guardarDatabase,
  actualizarDocumentoFiltrado,
} from 'config/firebaseCourageous';
import { Loading } from 'components/Loading'

import PublicLayout from 'layout/PublicLayout';


import { getUUID } from '../utils/utils';

export const Producto = () => {
  const { id } = useParams();
  console.log(id);

  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('');
  const [valor, setValor] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  //Hook Formulario
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data) {
      console.log(data);
      if (id === 'create') {
        handleGuardarProducto();
      } else {
        handleActualizarProducto();
      }
    }
  }; // your form submit function which will invoke after successful validation
  const consultarProducto = async (idProducto) => {
    setLoading(true);
    console.log('idProducto: ', idProducto);
    //const productoTemp = await consultarDocumentoDatabase('productos', idProducto)
    const productoTemp = await buscarDocumentoFiltrado('productos', idProducto);
    console.log('producto consultado:', productoTemp);
    setDescripcion(productoTemp.descripcion);
    setEstado(productoTemp.estado);
    setValor(productoTemp.valor);
    setLoading(false);
  };

  useEffect(() => {
    if (id !== 'create') {
      consultarProducto(id);
    }

    setDescripcion('');
    setEstado('');
    setValor('');
  }, [id]);

  const handleActualizarProducto = async (e) => {
    //e.preventDefault();

    const producto = {
      descripcion,
      estado,
      valor,
    };
    // console.log(producto);

    //await actualizarDocumentoDatabase('productos-courageous', id, producto);
    setLoading(true);
    await actualizarDocumentoFiltrado('productos', id, producto);
    alert('¡Producto actualizado con éxito!');
    setLoading(false);
    history.push('/productos');
  };

  const handleGuardarProducto = async (e) => {
    //e.preventDefault();

    const producto = {
      id: getUUID(),
      descripcion,
      estado,
      valor,
    };
    setLoading(true);
    await guardarDatabase('productos', producto);
    alert('¡Producto registrado con éxito!');
    setLoading(false);
    history.push('/productos');
  };

  return (
    <div >
      {loading ? (
        <Loading />
      ) : (
        <>
          <PublicLayout>
            <div className="container">
              <h1>{id === 'create' ? 'Crear ' : 'Editar '}Producto</h1>
              <hr />
              <div className='mt-3'>
                <div className='row'>
                  <div className='offset-md-3 col-md-6'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className='mb-3'>
                        <label className='form-label'>Descripción</label>
                        <input
                          className='form-control'
                          type='text'
                          required
                          placeholder='Descripción'
                          value={descripcion}
                          onChange={(event) => setDescripcion(event.target.value)}
                        />
                        {/* {errors.desc && <p>This field is required</p>} */}
                      </div>
                      <div className='mb-3'>
                        <label className='form-label'>Estado</label>
                        <select
                          id='inputEstadoProducto'
                          class='form-select'
                          required
                          onChange={(event) => setEstado(event.target.value)}
                        >
                          {estado === '' ? (
                            <>
                              <option
                                diabled
                                value=''
                                selected
                                className='text-muted'
                              >
                                Seleccione un estado
                              </option>
                              <option value='Disponible'>Disponible</option>
                              <option value=' No disponible'>No disponible</option>
                            </>
                          ) : estado === 'Disponible' ? (
                            <>
                              <option diabled value='' /* class='text-muted' */>
                                Seleccione un estado
                              </option>
                              <option value='Disponible' selected>
                                Disponible
                              </option>
                              <option value=' No disponible'>No disponible</option>
                            </>
                          ) : (
                            <>
                              <option diabled value='' /* class='text-muted' */>
                                Seleccione un estado
                              </option>
                              <option value='Disponible'>Disponible</option>
                              <option value=' No disponible' selected>
                                No disponible
                              </option>
                            </>
                          )}
                          ;
                        </select>
                      </div>
                      <div className='mb-3'>
                        <label className='form-label'>Precio Unitario</label>
                        <input
                          className='form-control'
                          type='number'
                          min='0'
                          required
                          placeholder='Precio Unitario'
                          value={valor}
                          onChange={(event) => setValor(event.target.value)}
                        />
                      </div>
                      <input
                        type='submit'
                        className='btn btn-primary'
                        value={
                          id === 'create'
                            ? 'Guardar producto'
                            : 'Actualizar producto'
                        }
                      />
                      {/* <button
                    type="button"
                    className='btn btn-primary'
                    // onClick={
                    //   id === 'create'
                    //     ? handleGuardarProducto
                    //     : handleActualizarProducto
                    // }
                  >
                    {id === 'create' ? 'Guardar' : 'Actualizar'} Producto
                  </button> */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </PublicLayout>
        </>
      )}
    </div>
  );
};
