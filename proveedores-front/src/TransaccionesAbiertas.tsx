import React, { useState, useEffect } from 'react';
import { fetchTransaccionesAbiertas, TransaccionAbierta, mapTipoDocumentoAbierto } from './api';
import { useProveedor } from './ProveedorContext';

const TransaccionesAbiertas: React.FC = () => {
  const { codigoProveedor } = useProveedor();
  const [transacciones, setTransacciones] = useState<TransaccionAbierta[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Función para cargar transacciones
  const cargarTransacciones = async (id: string) => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchTransaccionesAbiertas(id);
      setTransacciones(data);
    } catch (err) {
      setError('Error al cargar las transacciones abiertas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar al cambiar el codigoProveedor
  useEffect(() => {
    cargarTransacciones(codigoProveedor);
  }, [codigoProveedor]);

  // Función para formatear fecha
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  // Función para formatear moneda
  const formatCurrency = (amount: number, currency: string): string => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: currency.trim() || 'VEB',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Función para limpiar strings
  const cleanString = (str: string): string => {
    return str.trim();
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Documentos Analizados</h2>
      
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
      {!loading && codigoProveedor && transacciones.length > 0 && (
        <div style={{ overflowX: 'auto', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            backgroundColor: 'white'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Tipo</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Número</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Emisión</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Vencimiento</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Moneda</th>
                <th style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Monto</th>
              </tr>
            </thead>
            <tbody>
              {transacciones.map((transaccion, index) => (
                <tr 
                  key={index} 
                  style={{ 
                    borderBottom: '1px solid #eee',                  }}
                >
                  <td style={{ padding: '12px 16px' }}>{mapTipoDocumentoAbierto(transaccion.tipo)}</td>
                  <td style={{ padding: '12px 16px' }}>{cleanString(transaccion.docnumbr)}</td>
                  <td style={{ padding: '12px 16px' }}>{formatDate(transaccion.docdate)}</td>
                  <td style={{ padding: '12px 16px' }}>{formatDate(transaccion.duedate)}</td>
                  <td style={{ padding: '12px 16px' }}>{cleanString(transaccion.curncyid)}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    {formatCurrency(transaccion.docamnt, transaccion.curncyid)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && codigoProveedor && transacciones.length === 0 && (
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
          <span>No se encontraron documentos analizados para este proveedor</span>
        </div>
      )}
    </div>
  );
};

export default TransaccionesAbiertas;