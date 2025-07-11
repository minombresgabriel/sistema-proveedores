import React, { useState, useEffect } from 'react';
import { fetchTransaccionesAbiertas, TransaccionAbierta, mapTipoDocumentoAbierto } from './api';
import { useProveedor } from './ProveedorContext';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  CircularProgress, 
  Alert, 
  AlertTitle,
  Paper,
  Divider
} from '@mui/material';
import { 
  Paid as PaidIcon, 
  CalendarToday as CalendarIcon,
  HourglassEmpty as PendingIcon,
  AttachMoney as MoneyIcon,
  List as ListIcon
} from '@mui/icons-material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const TransaccionesAbiertasDashboard: React.FC = () => {
  const { codigoProveedor } = useProveedor();
  const [transacciones, setTransacciones] = useState<TransaccionAbierta[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    cargarTransacciones(codigoProveedor);
  }, [codigoProveedor]);

  // Función para formatear fecha
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  // Función para formatear moneda
  const formatCurrency = (amount: number, currency: string = 'VEB'): string => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: currency.trim() || 'VEB',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Datos para gráficos
  const getResumenPorTipo = () => {
    const resumen: Record<string, { count: number; total: number }> = {};
    
    transacciones.forEach(trans => {
      const tipo = mapTipoDocumentoAbierto(trans.tipo);
      if (!resumen[tipo]) {
        resumen[tipo] = { count: 0, total: 0 };
      }
      resumen[tipo].count += 1;
      resumen[tipo].total += trans.docamnt;
    });
    
    return Object.entries(resumen).map(([name, { count, total }]) => ({
      name,
      count,
      total
    }));
  };

  const getResumenPorMoneda = () => {
    const resumen: Record<string, number> = {};
    
    transacciones.forEach(trans => {
      const moneda = trans.curncyid.trim() || 'VEB';
      if (!resumen[moneda]) {
        resumen[moneda] = 0;
      }
      resumen[moneda] += trans.docamnt;
    });
    
    return Object.entries(resumen).map(([name, value]) => ({
      name,
      value
    }));
  };

  const getVencimientosProximos = () => {
    const hoy = new Date();
    const en7Dias = new Date();
    en7Dias.setDate(hoy.getDate() + 7);
    
    return transacciones.filter(trans => {
      const vencimiento = new Date(trans.duedate);
      return vencimiento >= hoy && vencimiento <= en7Dias;
    }).length;
  };

  const getTotalTransacciones = () => transacciones.length;
  const getMontoTotal = () => transacciones.reduce((sum, trans) => sum + trans.docamnt, 0);
  const getMonedaPrincipal = () => {
    const monedas = getResumenPorMoneda();
    return monedas.length > 0 ? monedas[0].name : 'VEB';
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: '30px', fontWeight: 'bold' }}>
        Dashboard de Transacciones Abiertas
      </Typography>
      
      {/* Mensaje cuando no hay proveedor seleccionado */}
      {!codigoProveedor && (
        <Alert severity="info" style={{ marginBottom: '20px' }}>
          <AlertTitle>Seleccione un proveedor</AlertTitle>
          Por favor seleccione un proveedor en el menú superior para visualizar los datos
        </Alert>
      )}

      {/* Mensajes de error */}
      {error && (
        <Alert severity="error" style={{ marginBottom: '20px' }}>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <CircularProgress size={60} />
        </div>
      )}

      {/* Dashboard */}
      {!loading && codigoProveedor && (
        <>
          {/* Cards con métricas principales */}
          <Grid container spacing={3} style={{ marginBottom: '30px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3}>
                <CardContent>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <ListIcon color="primary" style={{ fontSize: '40px', marginRight: '15px' }} />
                    <Typography variant="h5" component="div">
                      {getTotalTransacciones()}
                    </Typography>
                  </div>
                  <Typography variant="body2" color="text.secondary">
                    Transacciones abiertas
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3}>
                <CardContent>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <MoneyIcon color="success" style={{ fontSize: '40px', marginRight: '15px' }} />
                    <Typography variant="h5" component="div">
                      {formatCurrency(getMontoTotal(), getMonedaPrincipal())}
                    </Typography>
                  </div>
                  <Typography variant="body2" color="text.secondary">
                    Monto total pendiente
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3}>
                <CardContent>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <PendingIcon color="warning" style={{ fontSize: '40px', marginRight: '15px' }} />
                    <Typography variant="h5" component="div">
                      {getVencimientosProximos()}
                    </Typography>
                  </div>
                  <Typography variant="body2" color="text.secondary">
                    Vencen en 7 días
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3}>
                <CardContent>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <CalendarIcon color="secondary" style={{ fontSize: '40px', marginRight: '15px' }} />
                    <Typography variant="h5" component="div">
                      {transacciones.length > 0 ? formatDate(transacciones[0].docdate) : 'N/A'}
                    </Typography>
                  </div>
                  <Typography variant="body2" color="text.secondary">
                    Última transacción
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Gráficos */}
          <Grid container spacing={3} style={{ marginBottom: '30px' }}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} style={{ padding: '20px', height: '400px' }}>
                <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
                  Distribución por Tipo de Documento
                </Typography>
                <ResponsiveContainer width="100%" height="90%">
                  <PieChart>
                    <Pie
                      data={getResumenPorTipo()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {getResumenPorTipo().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name, props) => [
                        `${props.payload.name}: ${formatCurrency(props.payload.total, getMonedaPrincipal())}`,
                        `Cantidad: ${value}`
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper elevation={3} style={{ padding: '20px', height: '400px' }}>
                <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
                  Monto por Tipo de Documento
                </Typography>
                <ResponsiveContainer width="100%" height="90%">
                  <BarChart
                    data={getResumenPorTipo()}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis 
                      tickFormatter={(value) => formatCurrency(value, getMonedaPrincipal()).replace(/[^\d.,]/g, '')}
                    />
                    <Tooltip 
                      formatter={(value) => formatCurrency(Number(value), getMonedaPrincipal())}
                    />
                    <Legend />
                    <Bar dataKey="total" name="Monto Total" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>

          {/* Tabla detallada */}
          <Paper elevation={3} style={{ padding: '20px', marginBottom: '30px' }}>
            <Typography variant="h6" gutterBottom style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ListIcon /> Detalle de Transacciones Abiertas
            </Typography>
            <Divider style={{ marginBottom: '20px' }} />
            
            {transacciones.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
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
                          borderBottom: '1px solid #eee',
                          backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white'
                        }}
                      >
                        <td style={{ padding: '12px 16px' }}>{mapTipoDocumentoAbierto(transaccion.tipo)}</td>
                        <td style={{ padding: '12px 16px' }}>{transaccion.docnumbr.trim()}</td>
                        <td style={{ padding: '12px 16px' }}>{formatDate(transaccion.docdate)}</td>
                        <td style={{ padding: '12px 16px' }}>{formatDate(transaccion.duedate)}</td>
                        <td style={{ padding: '12px 16px' }}>{transaccion.curncyid.trim() || 'VEB'}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                          {formatCurrency(transaccion.docamnt, transaccion.curncyid)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <Alert severity="info" style={{ marginTop: '20px' }}>
                No se encontraron transacciones abiertas para este proveedor
              </Alert>
            )}
          </Paper>
        </>
      )}
    </div>
  );
};

export default TransaccionesAbiertasDashboard;