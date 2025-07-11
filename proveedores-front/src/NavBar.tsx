import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useProveedor } from './ProveedorContext';
import { getProveedores, Proveedor } from './api';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

const NavBar: React.FC = () => {
  const { logout, user } = useAuth();
  const { codigoProveedor, setCodigoProveedor } = useProveedor();
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loadingProveedores, setLoadingProveedores] = useState<boolean>(true);
  const [showConfigMenu, setShowConfigMenu] = useState<boolean>(false);
  const [showOperacionesMenu, setShowOperacionesMenu] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Obtener lista de proveedores al cargar el componente
  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        setLoadingProveedores(true);
        const data = await getProveedores();
        setProveedores(data);
      } catch (err) {
        setError('Error al cargar proveedores');
        console.error('Error al cargar proveedores:', err);
      } finally {
        setLoadingProveedores(false);
      }
    };

    fetchProveedores();
  }, []);

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
      logout();
      setCodigoProveedor(''); // Limpiar proveedor al cerrar sesión
      navigate('/login');
    }
  };

  const handleProveedorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nuevoCodigoProveedor = event.target.value;
    setCodigoProveedor(nuevoCodigoProveedor);
  };

  const toggleConfigMenu = () => {
    setShowConfigMenu(!showConfigMenu);
    setShowOperacionesMenu(false);
  };

  const toggleOperacionesMenu = () => {
    setShowOperacionesMenu(!showOperacionesMenu);
    setShowConfigMenu(false);
  };

  const isConfigActive = [
    '/proveedores', 
    '/empleados', 
    '/usuarios', 
    '/roles', 
    '/permisos', 
    '/rol-permisos'
  ].includes(location.pathname);

  const isOperacionesActive = [
    '/pagos-emitidos',
    '/productos-proveedor',
    '/facturas-retenidas',
    '/transacciones-recibidas',
    '/transacciones-abiertas'
  ].includes(location.pathname);

  const handleHomeClick = () => {
  };

  return (
    <nav className="navbar-container">
      <div className="nav-left-section">

        <Link
          to="/"
          onClick={handleHomeClick}
          className={`nav-button ${location.pathname === '/' ? 'active' : ''}`}
        >
          <i className="fas fa-home"></i> Inicio
        </Link>

        <div className="proveedor-combobox-container">
          {loadingProveedores ? (
            <div className="combobox-loading">
              <i className="fas fa-spinner fa-spin"></i> Cargando proveedores...
            </div>
          ) : error ? (
            <div className="combobox-error">
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          ) : (
            <>
              <select
                value={codigoProveedor}
                onChange={handleProveedorChange}
                className={`proveedor-combobox ${codigoProveedor ? 'has-selection' : ''}`}
              >
                <option value="">Seleccione un proveedor</option>
                {proveedores.map((proveedor) => (
                  <option 
                    key={proveedor.proveedor_id} 
                    value={proveedor.codigo_proveedor}
                  >
                    {proveedor.proveedor_name} ({proveedor.codigo_proveedor})
                  </option>
                ))}
              </select>
              {codigoProveedor && (
                <span className="selected-provider-badge">
                  <i className="fas fa-check"></i> 
                </span>
              )}
            </>
          )}
        </div>

        {/* Menú de Operaciones */}
        <div className="config-menu-container">
          <button
            onClick={toggleOperacionesMenu}
            onBlur={() => setTimeout(() => setShowOperacionesMenu(false), 200)}
            className={`nav-button config-button ${isOperacionesActive ? 'active' : ''}`}
          >
            <i className="fas fa-chart-line"></i> Consultas {showOperacionesMenu ? '▲' : '▼'}
          </button>
          
          {showOperacionesMenu && (
            <div className="config-submenu">
              {[
                { path: '/pagos-emitidos', label: 'Pagos Emitidos', icon: 'fas fa-money-bill-wave' },       
                { path: '/pagos-en-proceso', label: 'Pagos en Proceso', icon: 'fas fa-coins'},
                { path: '/facturas-retenidas', label: 'Facturas Retenidas', icon: 'fas fa-file-invoice-dollar' },
                { path: '/transacciones-recibidas', label: 'Transacciones Recibidas', icon: 'fas fa-file-import' },
                { path: '/transacciones-abiertas', label: 'Transacciones Abiertas', icon: 'fas fa-folder-open' },
                { path: '/productos-proveedor', label: 'Productos', icon: 'fas fa-boxes' }
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`submenu-item ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => setShowOperacionesMenu(false)}
                >
                  <i className={item.icon}></i> {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Menú de Configuración */}
        <div className="config-menu-container">
          <button
            onClick={toggleConfigMenu}
            onBlur={() => setTimeout(() => setShowConfigMenu(false), 200)}
            className={`nav-button config-button ${isConfigActive ? 'active' : ''}`}
          >
            <i className="fas fa-cog"></i> Configuración {showConfigMenu ? '▲' : '▼'}
          </button>
          
          {showConfigMenu && (
            <div className="config-submenu">
              {[
                { path: '/proveedores', label: 'Proveedores', icon: 'fas fa-truck' },
                { path: '/empleados', label: 'Empleados', icon: 'fas fa-users' },
                { path: '/usuarios', label: 'Usuarios', icon: 'fas fa-user-circle' },
                { path: '/roles', label: 'Roles', icon: 'fas fa-user-tag' },
                { path: '/permisos', label: 'Permisos', icon: 'fas fa-key' },
                { path: '/rol-permisos', label: 'Rol-Permisos', icon: 'fas fa-shield-alt' }
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`submenu-item ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => {
                    setShowConfigMenu(false);
                    setCodigoProveedor(''); // Limpiar selección al ir a configuración
                  }}
                >
                  <i className={item.icon}></i> {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="user-section">
        <span className="username">
          <i className="fas fa-user"></i> {user?.user_username}
        </span>
        <button onClick={handleLogout} className="logout-button">
          <i className="fas fa-sign-out-alt"></i> Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default NavBar;