// components/ProveedorComboBox.tsx
import React from 'react';
import { useProveedor } from './ProveedorContext';

interface Proveedor {
  proveedor_id: number;
  codigo_proveedor: string;
  nombre_proveedor: string;
}

interface ProveedorComboBoxProps {
  proveedores: Proveedor[];
  loading: boolean;
  error: string | null;
}

const ProveedorComboBox: React.FC<ProveedorComboBoxProps> = ({ 
  proveedores, 
  loading, 
  error 
}) => {
  const { codigoProveedor, setCodigoProveedor } = useProveedor();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCodigoProveedor(e.target.value);
  };

  if (loading) return <div>Cargando proveedores...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="proveedor-combobox">
      <h3>Proveedor Actual</h3>
      <select 
        value={codigoProveedor} 
        onChange={handleChange}
        className="form-select"
      >
        <option value="">-- Seleccione --</option>
        {proveedores.map((proveedor) => (
          <option 
            key={proveedor.proveedor_id} 
            value={proveedor.codigo_proveedor}
          >
            {proveedor.nombre_proveedor}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProveedorComboBox;