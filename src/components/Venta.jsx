import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  actualizarDocumentoDatabase,
  consultarDocumentoDatabase,
  buscarDocumentoFiltrado,
  guardarDatabase,
  actualizarDocumentoFiltrado,
} from 'config/firebaseCourageous';
import { Loading } from 'components/Loading'

import PublicLayout from 'layout/PublicLayout';


import { getUUID } from '../utils/utils';

export const Venta = () => {
  const { id } = useParams();
  console.log(id);

  const [valorTotal, setvalorTotal] = useState('');
  const [idProducto, setProducto] = useState('');
  const [Fecha, setFecha] = useState('');
  const [cantidad, setcantidad] = useState('');
  const [precioUnitario, setprecioUnitario] = useState('');
  const [estadoVenta, setestadoVenta] = useState('');
  const [idCliente, setidCliente] = useState('');
  const [nombreCliente, setnombreCliente] = useState('');
  const [idVendedor, setidVendedor] = useState('');

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
        handleGuardarVenta();
      } else {
        handleActualizarVenta();
      }
    }
  }; // your form submit function which will invoke after successful validation
  const consultarVenta = async (idVenta) => {
    setLoading(true);
    console.log('idVenta: ', idVenta);
    //const productoTemp = await consultarDocumentoDatabase('productos', idProducto)
    const ventaTemp = await buscarDocumentoFiltrado('ventas', idVenta);
    console.log('Venta:', ventaTemp);
    setvalorTotal(ventaTemp.valorTotal);
    setProducto(ventaTemp.idProducto);
    setFecha(ventaTemp.Fecha);
    setcantidad(ventaTemp.cantidad);
    setprecioUnitario(ventaTemp.precioUnitario);
    setestadoVenta(ventaTemp.estadoVenta);
    setidCliente(ventaTemp.idCliente);
    setnombreCliente(ventaTemp.nombreCliente);
    setidVendedor(ventaTemp.idVendedor);
    setLoading(false);
  };

  useEffect(() => {
    if (id !== 'create') {
      consultarVenta(id);
    }

    setvalorTotal('');
    setProducto('');
    setFecha('');
    setcantidad('');
    setprecioUnitario('');
    setestadoVenta('');
    setidCliente('');
    setnombreCliente('');
    setidVendedor('');
  }, [id]);

  const handleActualizarVenta = async (e) => {
    //e.preventDefault();

    const venta = {
      valorTotal,
      idProducto,
      Fecha,
      cantidad,
      precioUnitario,
      estadoVenta,
      idCliente,
      nombreCliente,
      idVendedor,
    };
    // console.log(producto);

    //await actualizarDocumentoDatabase('productos-courageous', id, producto);
    setLoading(true);
    await actualizarDocumentoFiltrado('ventas', id, venta);
    alert('¡Ventas actualizada con éxito!');
    setLoading(false);
    history.push('/ventas');
  };

  const handleGuardarVenta = async (e) => {
    //e.preventDefault();

    const venta = {
      id: getUUID(),
      valorTotal,
      idProducto,
      Fecha,
      cantidad,
      precioUnitario,
      estadoVenta,
      idCliente,
      nombreCliente,
      idVendedor,

    };
    setLoading(true);
    await guardarDatabase('ventas', venta);
    alert('Venta registrada con éxito!');
    setLoading(false);
    history.push('/ventas');
  };

  return (
    <div >
      {loading ? (
        <Loading />
      ) : (
        <>
        <PublicLayout>
          <div className="container">
          <h1>{id === 'create' ? 'Crear ' : 'Editar '}Venta</h1>
          <hr />
          <div className='mt-3'>
            <div className='row'>
              <div className='offset-md-3 col-md-6'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='mb-3'>
                    <label className='form-label'>Valor Total</label>
                    <input
                      className='form-control'
                      type='number'
                      required
                      placeholder='Valor Total'
                      value={valorTotal}
                      onChange={(event) => setvalorTotal(event.target.value)}
                    />
                    {/* {errors.desc && <p>This field is required</p>} */}
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Id Producto</label>
                    <input
                      className='form-control'
                      type='text'
                      required
                      placeholder='Id Producto'
                      value={idProducto}
                      onChange={(event) => setProducto(event.target.value)}
                    />
                    {/* {errors.desc && <p>This field is required</p>} */}
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Fecha</label>
                    <input
                      className='form-control'
                      type='date'
                      min="2000-01-02"
                      required
                      value={Fecha}
                      onChange={(event) => setFecha(event.target.value)}
                    />
                    {/* {errors.desc && <p>This field is required</p>} */}
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Cantidad</label>
                    <input
                      className='form-control'
                      type='number'
                      required
                      placeholder='Cantidad'
                      value={cantidad}
                      onChange={(event) => setcantidad(event.target.value)}
                    />
                    {/* {errors.desc && <p>This field is required</p>} */}
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Precio Unitario</label>
                    <input
                      className='form-control'
                      type='number'
                      min='0'
                      required
                      placeholder='Precio Unitario'
                      value={precioUnitario}
                      onChange={(event) => setprecioUnitario(event.target.value)}
                    />
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Estado Venta</label>
                    <select
                      id='inputEstadoProducto'
                      className='form-select'
                      required
                      onChange={(event) => setestadoVenta(event.target.value)}
                    >
                      {estadoVenta === '' ? (
                        <>
                          <option
                            diabled
                            value=''
                            selected
                            className='text-muted'
                          >
                            Seleccione un estado
                          </option>
                          <option value='En progreso'>En progreso</option>
                          <option value='Entregada'>Entregada</option>
                          <option value='Cancelada'>Cancelada</option>
                        </>
                      ) : estadoVenta === 'En progreso' ? (
                        <>
                          <option diabled value='' /* class='text-muted' */>
                            Seleccione un estado
                          </option>
                          <option value='En progreso' selected>En progreso</option>
                          <option value='Entregada'>Entregada</option>
                          <option value='Cancelada'>Cancelada</option>
                        </>
                      ) : estadoVenta === 'Entregada' ? (
                        <>
                          <option diabled value='' /* class='text-muted' */>
                            Seleccione un estado
                          </option>
                          <option value='En progreso'>En progreso</option>
                          <option value='Entregada' selected>Entregada</option>
                          <option value='Cancelada'>Cancelada</option>


                        </>
                      ) : estadoVenta === 'Cancelada' ? (
                        <>
                          <option diabled value='' /* class='text-muted' */>
                            Seleccione un estado
                          </option>

                          <option value='En progreso'>En progreso</option>
                          <option value='Entregada'>Entregada</option>
                          <option value='Cancelada' selected>Cancelada</option>

                        </>
                      ) : (
                        <>
                          <option diabled value='' /* class='text-muted' */>
                            Seleccione un estado
                          </option>
                          <option value='En progreso' selected>En progreso</option>
                          <option value='Entregada'>Entregada</option>
                          <option value='Cancelada'>Cancelada</option>
                        </>
                      )}
                      ;
                    </select>
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Id Cliente</label>
                    <input
                      className='form-control'
                      type='text'
                      required
                      placeholder='Id Cliente'
                      value={idCliente}
                      onChange={(event) => setidCliente(event.target.value)}
                    />
                    {/* {errors.desc && <p>This field is required</p>} */}
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Nombre Cliente</label>
                    <input
                      className='form-control'
                      type='text'
                      required
                      placeholder='Nombre Cliente'
                      value={nombreCliente}
                      onChange={(event) => setnombreCliente(event.target.value)}
                    />
                    {/* {errors.desc && <p>This field is required</p>} */}
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Id Vendedor</label>
                    <input
                      className='form-control'
                      type='text'
                      required
                      placeholder='Id Vendedor'
                      value={idVendedor}
                      onChange={(event) => setidVendedor(event.target.value)}
                    />
                    {/* {errors.desc && <p>This field is required</p>} */}
                  </div>

                  <input
                    type='submit'
                    className='btn btn-primary'
                    value={
                      id === 'create'
                        ? 'Guardar Venta'
                        : 'Actualizar Venta'
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
