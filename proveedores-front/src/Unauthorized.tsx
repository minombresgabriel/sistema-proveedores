import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  return (
    <div className="unauthorized-container">
      <h1>Acceso no autorizado</h1>
      <p>No tienes permisos para acceder a esta página.</p>
      <Link to="" className="back-button">
        Volver al inicio
      </Link>
    </div>
  );
};

export default Unauthorized;