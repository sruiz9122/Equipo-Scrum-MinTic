import React from 'react';
import PublicLayout from './../layout/PublicLayout';

const StagingArea = () => {
  return (
    <>
      <PublicLayout>
        <div className="container d-flex flex-column justify-content-center align-items-center my-5 py-5">
            <div className='h2'>¡Bienvenido al portal Venta de Gasolina!</div>
            <br />
            <div className='h6'>
              Debes esperar a que un administrador te asigne un rol
            </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default StagingArea;
