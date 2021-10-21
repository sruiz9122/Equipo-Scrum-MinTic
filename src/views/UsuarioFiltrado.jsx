import {
    consultarDocumentoDatabase,
    actualizarDocumentoFiltrado,
  } from 'config/firebaseCourageous';

import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'

export const UsuarioFiltrado = () => {

    const { id } = useParams()
    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')
    const [rol, setRol] = useState('')
    const [estado, setEstado] = useState('')
    const history = useHistory()

    // Funcion
    const consultarUsuario = async (idUsuario) => {
        const usuarioTemp = await consultarDocumentoDatabase('usuarios', idUsuario)
        setNombre(usuarioTemp.nombre)
        setCorreo(usuarioTemp.correo)
        setRol(usuarioTemp.rol)
        setEstado(usuarioTemp.estado)
    }

    useEffect(() => {
        consultarUsuario(id)
        setNombre('');
        setCorreo('');
        setRol('');
        setEstado('');
    }, [id])

    const handleActualizarUsuario = async (e) => {
        e.preventDefault()
        let valor = true;
        if (estado !== 'Autorizado' && estado !== 'No autorizado') {
            valor = false;
        }
        else if (rol !== 'Vendedor' && rol !== 'Administrador') {
            valor = false;
        }
        if (valor) {
            const usuarioActualizado = {
                rol,
                estado
            }
            console.log(usuarioActualizado);
            await actualizarDocumentoFiltrado('usuarios', id, usuarioActualizado);
            alert('¡Usuario actualizado con éxito')
            history.push(`/Usuarios`);
        }
        else{
            alert('¡Datos ingresados incorrectos!')
        }
    }

    return (
        <>
            <div className="container">

                <div>
                    {/* <!-- Titulo --> */}
                    <h3 className="h3" align="right">Actualizar (Rol/Estado) de usuario</h3>
                </div>
                <form action="">
                    {/* <!-- Opciones de Búsqueda --> */}
                    <div className="input-group mb-3">
                        <select id="rolUsuario"
                            className="form-select"
                            required
                            onChange={(event) => setRol(event.target.value)}>
                            {rol === '' ? (
                                <>
                                    <option
                                        diabled
                                        value=''
                                        selected
                                        className='text-muted'>
                                        Seleccione un rol
                                    </option>
                                    <option value='Administrador'>Administrador</option>
                                    <option value='Vendedor'>Vendedor</option>
                                </>
                            ) : rol === 'Administrador' ? (
                                <>
                                    <option diabled value='' /* class='text-muted' */>
                                        Seleccione un rol
                                    </option>
                                    <option value='Administrador' selected>
                                        Administrador
                                    </option>
                                    <option value='Vendedor'>Vendedor</option>
                                </>
                            ) : (
                                <>
                                    <option diabled value='' /* class='text-muted' */>
                                        Seleccione un rol
                                    </option>
                                    <option value='Administrador'>Administrador</option>
                                    <option value='Vendedor' selected>
                                        Vendedor
                                    </option>
                                </>
                            )
                            }
                        </select>

                        <select
                            id='estadoUsuario'
                            class='form-select'
                            required
                            onChange={(event) => setEstado(event.target.value)}
                        >
                            {estado === 'Pendiente' ? (
                                <>
                                    <option
                                        diabled
                                        value=''
                                        selected
                                        className='text-muted'
                                    >
                                        Seleccione un estado
                                    </option>
                                    <option value='Autorizado'>Autorizado</option>
                                    <option value=' No Autorizado'>No Autorizado</option>
                                </>
                            ) : estado === 'Autorizado' ? (
                                <>
                                    <option diabled value='' /* class='text-muted' */>
                                        Seleccione un estado
                                    </option>
                                    <option value='Autorizado' selected>
                                        Autorizado
                                    </option>
                                    <option value=' No Autorizado'>No Autorizado</option>
                                </>
                            ) : (
                                <>
                                    <option diabled value='' /* class='text-muted' */>
                                        Seleccione un estado
                                    </option>
                                    <option value='Autorizado'>Autorizado</option>
                                    <option value=' No Autorizado' selected>
                                        No Autorizado
                                    </option>
                                </>
                            )}
                            ;
                        </select>
                        <Link className="btn btn-dark"
                            to={`/Usuarios`}>
                            Limpiar
                        </Link>
                        <Link className="btn btn-dark"
                            onClick={handleActualizarUsuario}
                            to={`/Usuarios/actualizar`}>
                            Confirmar
                        </Link>
                    </div>
                </form>
                {/* <!-- Tabla resultado busqueda --> */}
                <table className="table">
                    <thead className="table table-dark">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre de Usuario</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Rol</th>
                            <th scope="col">Estado</th>
                        </tr>
                    </thead>
                    <tbody id="bodyTabla">
                        {
                            <tr key={id}>
                                <td scope="row">{id}</td>
                                <td>{nombre}</td>
                                <td>{correo}</td>
                                <td>{rol}</td>
                                <td>{estado}</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div >
            {/* //   <!-- Resultado de Edición --> */}
            <div div >
                <div id="usuarioeditar">
                </div>
                <br />
                <br />
                <p align="right">
                </p>
            </div >
        </>
    )
}
