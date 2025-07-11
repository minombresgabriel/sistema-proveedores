import React, { useEffect, useState } from 'react';
import { getPermissions, Permission, deletePermission } from './api';
import PermissionForm from './PermissionForm'; // Importar el formulario

const PermissionsList: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [showPermissionForm, setShowPermissionForm] = useState(false); // Estado para mostrar/ocultar el formulario

  // Cargar la lista de permisos al montar el componente
  useEffect(() => {
    const fetchPermissions = async () => {
      const data = await getPermissions();
      setPermissions(data);
    };

    fetchPermissions();
  }, []);

  // Función para eliminar un permiso con confirmación
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este permiso?');
    if (confirmDelete) {
      await deletePermission(id);
      setPermissions(permissions.filter((permission) => permission.permission_id !== id)); // Actualizar la lista
    }
  };

  // Función para manejar la creación exitosa de un permiso
  const handlePermissionCreated = async () => {
    const data = await getPermissions(); // Recargar la lista de permisos
    setPermissions(data);
    setShowPermissionForm(false); // Ocultar el formulario
  };

  return (
    <div>
      <h2>Lista de Permisos</h2>

      <button
        onClick={() => setShowPermissionForm(!showPermissionForm)}
        style={{ marginRight: '10px' }}
      >
        {showPermissionForm ? 'Ocultar Formulario' : 'Agregar Nuevo Permiso'}
      </button>

      {showPermissionForm && (
        <PermissionForm
          onSuccess={handlePermissionCreated} // Actualizar la lista y ocultar el formulario
          onCancel={() => setShowPermissionForm(false)} // Ocultar el formulario sin hacer nada
        />
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Creado por</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission.permission_id}>
              <td>{permission.permission_id}</td>
              <td>{permission.permission_name}</td>
              <td>{permission.id_created_by}</td>
              <td>{new Date(permission.date_created).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Evitar que el clic en el botón active la edición
                    handleDelete(permission.permission_id);
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

export default PermissionsList;