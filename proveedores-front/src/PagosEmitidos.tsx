import React, { useState, useEffect } from 'react';
import { fetchPagosEmitidos } from './api';
import { useProveedor } from './ProveedorContext';

const PagosEmitidos: React.FC = () => {
  const { codigoProveedor } = useProveedor();
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [pagos, setPagos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBuscar = async () => {
    if (!codigoProveedor) return;
    if (!fechaInicio || !fechaFin) {
      setError('Las fechas son requeridas');
      return;
    }

    setLoading(true);
    setError('');
    setPagos([]);

    try {
      const resultados = await fetchPagosEmitidos(
        codigoProveedor,
        fechaInicio,
        fechaFin
      );
      
      if (resultados && resultados.length > 0) {
        setPagos(resultados);
      } else {
        setError('No se encontraron pagos con los criterios de búsqueda');
      }
    } catch (err) {
      setError('Error al obtener los pagos. Verifique los datos e intente nuevamente.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para limpiar resultados cuando cambia el proveedor
  useEffect(() => {
    setPagos([]);
    setFechaInicio('');
    setFechaFin('');
    setError('');
  }, [codigoProveedor]);

  // Función mejorada para formatear fechas
  const formatFecha = (fechaString: string) => {
    try {
      const fechaPart = fechaString.split('T')[0];
      const [year, month, day] = fechaPart.split('-');
      return `${day}/${month}/${year}`;
    } catch {
      return fechaString;
    }
  };

  // Función mejorada para formatear moneda
  const formatMoneda = (monto: number) => {
    try {
      return new Intl.NumberFormat('es-VE', {
        style: 'currency',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(monto);
    } catch {
      return `${monto?.toFixed(2) || '0.00'}`;
    }
  };

  // Función para limpiar espacios
  const cleanValue = (value: string) => {
    return value?.trim() || '';
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Pagos Emitidos</h2>

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

      {/* Filtros */}
      {codigoProveedor && (
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginBottom: '20px',
          alignItems: 'end'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Fecha Inicio</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Fecha Fin</label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          
          <button 
            onClick={handleBuscar}
            disabled={loading || !codigoProveedor}
            style={{
              padding: '8px 16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              height: '36px'
            }}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                Buscando...
              </>
            ) : 'Buscar'}
          </button>
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

      {/* Tabla de resultados */}
      {!loading && codigoProveedor && pagos.length > 0 && (
        <div style={{ overflowX: 'auto', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            backgroundColor: 'white'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Proveedor</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Nombre</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Referencia</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Fecha</th>
                <th style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Monto</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Chequera</th>
              </tr>
            </thead>
            <tbody>
              {pagos.map((pago, index) => (
                <tr 
                  key={`${cleanValue(pago.vendorid)}-${cleanValue(pago.docnumbr)}-${index}`}
                  style={{ borderBottom: '1px solid #eee' }}
                >
                  <td style={{ padding: '12px 16px' }}>{cleanValue(pago.vendorid)}</td>
                  <td style={{ padding: '12px 16px' }}>{cleanValue(pago.vendname)}</td>
                  <td style={{ padding: '12px 16px' }}>{cleanValue(pago.docnumbr)}</td>
                  <td style={{ padding: '12px 16px' }}>{formatFecha(pago.docdate)}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>{formatMoneda(pago.docamnt)}</td>
                  <td style={{ padding: '12px 16px' }}>{cleanValue(pago.chekbkid)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mensaje cuando no hay resultados */}
      {!loading && codigoProveedor && pagos.length === 0 && !error && (
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
          <span>{fechaInicio && fechaFin ? 'No se encontraron pagos emitidos para este periodo' : 'Ingrese un rango de fechas para buscar pagos'}</span>
        </div>
      )}
    </div>
  );
};

export default PagosEmitidos;