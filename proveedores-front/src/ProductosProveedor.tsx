import React, { useState, useEffect } from 'react';
import { fetchProductosProveedor, ProductoProveedor } from './api';
import { useNavigate } from 'react-router-dom';
import { useProveedor } from './ProveedorContext';

const ProductosProveedor: React.FC = () => {
  const { codigoProveedor } = useProveedor();
  const [productos, setProductos] = useState<ProductoProveedor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Función para cargar productos
  const cargarProductos = async (id: string) => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchProductosProveedor(id);
      setProductos(data);
    } catch (err) {
      setError('Error al cargar los productos del proveedor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar al cambiar el codigoProveedor
  useEffect(() => {
    cargarProductos(codigoProveedor);
  }, [codigoProveedor]);

  // Función para navegar al detalle
  const verDetalle = (itemNumber: string) => {
    navigate(`/lista-productos/details/${itemNumber}`);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Listado de Productos</h2>
      
      {/* Mensaje cuando no hay proveedor seleccionado */}
      {!codigoProveedor && (
        <div style={{ 
          padding: '15px',
          marginBottom: '20px',
          backgroundColor: '#fff3cd',
          color: '#856404',
          borderLeft: '4px solid #ffeeba',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <i className="fas fa-info-circle" style={{ fontSize: '20px' }}></i>
          <span>Por favor seleccione un proveedor en el menú superior</span>
        </div>
      )}

      {/* Mensajes de estado */}
      {error && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#ffebee', 
          color: '#d32f2f',
          marginBottom: '20px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <i className="fas fa-exclamation-circle"></i>
          <span>{error}</span>
        </div>
      )}

      {loading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {/* Tabla de resultados */}
      {!loading && codigoProveedor && productos.length > 0 && (
        <div style={{ overflowX: 'auto', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            backgroundColor: 'white'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Número</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto, index) => (
                <tr 
                  key={index} 
                  style={{ 
                    borderBottom: '1px solid #eee',
                    cursor: 'pointer'
                  }}
                  onClick={() => verDetalle(producto.itemnmbr)}
                >
                  <td style={{ 
                    padding: '12px 16px',
                    color: '#2196F3',
                    textDecoration: 'underline'
                  }}>
                    {producto.itemnmbr}
                  </td>
                  <td style={{ padding: '12px 16px' }}>{producto.itemdesc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && codigoProveedor && productos.length === 0 && (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}>
          <i className="fas fa-search" style={{ color: '#6c757d' }}></i>
          <span>No se encontraron productos asociados a este proveedor</span>
        </div>
      )}
    </div>
  );
};

export default ProductosProveedor;