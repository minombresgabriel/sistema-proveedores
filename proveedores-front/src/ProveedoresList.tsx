import React, { useEffect, useState } from 'react';
import { getProveedores, deleteProveedor, Proveedor } from './api';
import ProveedorForm from './ProveedorForm'; // Importar el formulario

const ProveedoresList: React.FC = () => {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [showProveedorForm, setShowProveedorForm] = useState(false); // Estado para mostrar/ocultar el formulario

  // Cargar la lista de proveedores al montar el componente
  useEffect(() => {
    const fetchProveedores = async () => {
      const data = await getProveedores();
      setProveedores(data);
    };

    fetchProveedores();
  }, []);

  // Función para eliminar un proveedor con confirmación
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este proveedor?');
    if (confirmDelete) {
      await deleteProveedor(id);
      setProveedores(proveedores.filter((proveedor) => proveedor.proveedor_id !== id)); // Actualizar la lista
    }
  };

  // Función para manejar la creación exitosa de un proveedor
  const handleProveedorCreated = async () => {
    const data = await getProveedores(); // Recargar la lista de proveedores
    setProveedores(data);
    setShowProveedorForm(false); // Ocultar el formulario
  };

  return (
    <div>
      <h2>Lista de Proveedores</h2>

      <button
        onClick={() => setShowProveedorForm(!showProveedorForm)}
        style={{ marginRight: '10px' }}
      >
        {showProveedorForm ? 'Ocultar Formulario' : 'Agregar Nuevo Proveedor'}
      </button>

      {showProveedorForm && (
        <ProveedorForm
          onSuccess={handleProveedorCreated} // Actualizar la lista y ocultar el formulario
          onCancel={() => setShowProveedorForm(false)} // Ocultar el formulario sin hacer nada
        />
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Código Proveedor</th>
            <th>Usuario</th>
            <th>Creado por</th>
            <th>Fecha Creado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            <tr key={proveedor.proveedor_id}>
              <td>{proveedor.proveedor_id}</td>
              <td>{proveedor.proveedor_name}</td>
              <td>{proveedor.codigo_proveedor}</td>
              <td>{proveedor.id_user}</td>
              <td>{proveedor.id_created_by || '-'}</td>
              <td>{new Date(proveedor.date_created).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Evitar que el clic en el botón active la edición
                    handleDelete(proveedor.proveedor_id);
                  }}
                  style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProveedoresList;

