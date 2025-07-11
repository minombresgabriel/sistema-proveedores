import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { ProveedorProvider } from './ProveedorContext';
import NavBar from './NavBar';
import Login from './Login';
import Home from './Home';
import ProveedoresList from './ProveedoresList';
import EmployeesList from './EmployeesList';
import UsersList from './UsersList';
import RolesList from './RolesList';
import PermissionsList from './PermissionsList';
import RolPermissionsList from './RolPermissionsList';
import ProductosProveedor from './ProductosProveedor';
import PagosEmitidos from './PagosEmitidos';
import './App.css';
import TransaccionesAbiertas from './TransaccionesAbiertas';
import TransaccionesRecibidas from './TransaccionesRecibidas';
import FacturasRetenidas from './FacturasRetenidas';
import PagosEnProceso from './PagosEnProceso';


const App: React.FC = () => {
  const { user, token } = useAuth();

  if (!user || !token) {
    return <Login />;
  }

  

  return (
    <ProveedorProvider>
      <div className="app-container">
        <header className="app-header">
          <NavBar />
        </header>

        <main className="app-content">
          <Routes>
            {/*EL ADMIN VERA TODAS LAS RUTAS*/ }

            <Route path="/" element={<Home />} />
            <Route path="/proveedores" element={<ProveedoresList />} />
            <Route path="/empleados" element={<EmployeesList />} />
            <Route path="/usuarios" element={<UsersList />} />
            <Route path="/roles" element={<RolesList />} />
            <Route path="/permisos" element={<PermissionsList />} />
            <Route path="/rol-permisos" element={<RolPermissionsList />} />
            {/*ESTOS ABAJO ES SOLO LO QUE VERA EL PROVEEDOR*/ }
            <Route path="/pagos-emitidos" element={<PagosEmitidos />} />
            <Route path="/pagos-en-proceso" element={<PagosEnProceso />} />
            <Route path="/productos-proveedor" element={<ProductosProveedor />} />
            <Route path="/facturas-retenidas" element={<FacturasRetenidas />} />
            <Route path="/transacciones-abiertas" element={<TransaccionesAbiertas />} />
            <Route path="/transacciones-recibidas" element={<TransaccionesRecibidas />} />



            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>Sistema de Gestión de Proveedores - Versión 1.0</p>
        </footer>
      </div>
    </ProveedorProvider>
  );
};

export default App;