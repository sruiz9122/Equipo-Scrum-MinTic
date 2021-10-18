import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { consultarDatabase } from 'config/firebaseCourageous';
import { Loading } from 'components/Loading';

export const Ventas = () => {
  const [listaProductos, setListaProductos] = useState([]);
  const [loading, setLoading] = useState(false);

  //filtros de búsqueda
  const [filtroId, setFiltroId] = useState('');
  const [filtroDescripcion, setFiltroDescripcion] = useState('');
  const [filtroIdVendedor, setfiltroIdVendedor] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const cargarProductos = async () => {
    setLoading(true);
    const listaTemporal = await consultarDatabase('ventas');
    console.log(listaTemporal);
    setListaProductos(listaTemporal);
    setLoading(false);
  };
  // cargarProductos()

  useEffect(() => {
    cargarProductos();
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
    <div className='container px-5 pt-4'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1>
            Lista Ventas
            <Link
              to='/ventas/create'
              className='btn btn-outline-success float-end'
            >
              Realizar venta
            </Link>
          </h1>
          <h5>Filtrar:</h5>
          <input
            type='text'
            placeholder='Busca por Id Venta...'
            onChange={(e) => {
              setFiltroId(e.target.value);
            }}
          />
          <input
            disabled={isDisabled ? 'disabled' : ''}
            type='text'
            placeholder='Busca por Id Cliente...'
            onChange={(e) => {
              setFiltroDescripcion(e.target.value);
            }}
          />
        <input
            disabled={isDisabled ? 'disabled' : ''}
            type='text'
            placeholder='Busca por Id Vendedor...'
            onChange={(e) => {
                setfiltroIdVendedor(e.target.value);
            }}
          />

          <hr />
          <table className='table'>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Id Venta</th>
                <th scope="col">Estado</th>
                <th scope="col">Valor total venta</th>
                <th scope="col">Id Prod</th>
                <th scope="col">Cantidad Producto</th>
                <th scope="col">Precio unitario</th>
                <th scope="col">Fecha venta</th>
                <th scope="col">Doc. Identidad cliente</th>
                <th scope="col">Id Vendedor</th>
                <th scope="col">Editar</th>
              </tr>
            </thead>
            <tbody>
              {listaProductos
                .filter((val) => {
                  if (filtroDescripcion == '' && filtroId == '' && filtroIdVendedor == '') {
                    return val;
                  } else if (filtroId !== '' ) {
                    if (val.id.toLowerCase().includes(filtroId.toLowerCase())) {
                      return val;
                    }
                  } else if (filtroIdVendedor !== ''){
                    if (val.idVendedor.toLowerCase().includes(filtroIdVendedor.toLowerCase())) {
                      return val;
                    }
                  } else if (
                    val.idCliente
                      .toLowerCase()
                      .includes(filtroDescripcion.toLowerCase())
                  ) {
                    return val;
                  } 
                })
                .map((venta, index) => (
                  <tr key={venta.id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{venta.id}</td>
                    <td>{venta.estadoVenta}</td>
                    <td>{venta.valorTotal}</td>
                    <td>{venta.idProducto}</td>
                    <td>{venta.cantidad}</td>
                    <td>{venta.precioUnitario}</td>
                    <td>{venta.Fecha}</td>
                    <td>{venta.idCliente}</td>
                    <td>{venta.idVendedor}</td>
                    <td>
                      <Link
                        className='btn btn-outline-primary btn-sm'
                        to={`/ventas/${venta.id}`}
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
  );
};
