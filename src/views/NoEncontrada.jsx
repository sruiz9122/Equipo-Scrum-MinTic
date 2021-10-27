import PublicLayout from 'layout/PublicLayout';
import React from 'react';
import { Link } from 'react-router-dom';

const NoEncontrada = () => {
  return (
    <>
      <PublicLayout >
        <div className="d-flex flex-column justify-content-center align-items-center my-5 py-5">
            <div className="h2">404- Página no encontrada</div>
            <Link className='btn btn-outline-primary' to='/'>
              Regresar
            </Link>
        </div>
      </PublicLayout>
    </>
  );
};

export default NoEncontrada;
