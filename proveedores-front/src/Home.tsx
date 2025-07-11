import React from 'react';
import PagosEmitidos from './PagosEmitidos';
import PagosEnProceso from './PagosEnProceso';
import FacturasRetenidas from './FacturasRetenidas';
import TransaccionesRecibidas from './TransaccionesRecibidas';
import TransaccionesAbiertas from './TransaccionesAbiertas';
import ProductosProveedor from './ProductosProveedor';
import TransaccionesAbiertasDashboard from './TransaccionesAbiertasDashboard'

const Home: React.FC = () => {
  return (
    <div className="home-container">

      <div className="home-features">
        <div className="feature-card">
        <TransaccionesAbiertasDashboard/>
          <PagosEmitidos/>
          <PagosEnProceso/>
          <FacturasRetenidas/>
          <TransaccionesRecibidas/>
          <TransaccionesAbiertas/>
          <ProductosProveedor/>
        </div>

      </div>
    </div>
  );
};

export default Home;