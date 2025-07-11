import React, { useEffect, useState } from 'react';
import { getRoles, Rol, deleteRol } from './api';
import RolForm from './RolForm'; // Importar el formulario

const RolesList: React.FC = () => {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [showRolForm, setShowRolForm] = useState(false); // Estado para mostrar/ocultar el formulario

  // Cargar la lista de roles al montar el componente
  useEffect(() => {
    const fetchRoles = async () => {
      const data = await getRoles();
      setRoles(data);
    };

    fetchRoles();
  }, []);

  // Función para eliminar un rol con confirmación
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este rol?');
    if (confirmDelete) {
      await deleteRol(id);
      setRoles(roles.filter((rol) => rol.rol_id !== id)); // Actualizar la lista
    }
  };

  // Función para manejar la creación exitosa de un rol
  const handleRolCreated = async () => {
    const data = await getRoles(); // Recargar la lista de roles
    setRoles(data);
    setShowRolForm(false); // Ocultar el formulario
  };

  return (
    <div>
      <h2>Lista de Roles</h2>

      <button
        onClick={() => setShowRolForm(!showRolForm)}
        style={{ marginRight: '10px' }}
      >
        {showRolForm ? 'Ocultar Formulario' : 'Agregar Nuevo Rol'}
      </button>

      {showRolForm && (
        <RolForm
          onSuccess={handleRolCreated} // Actualizar la lista y ocultar el formulario
          onCancel={() => setShowRolForm(false)} // Ocultar el formulario sin hacer nada
        />
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del Rol</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((rol) => (
            <tr key={rol.rol_id}>
              <td>{rol.rol_id}</td>
              <td>{rol.rol_name}</td>
              <td>{new Date(rol.date_created).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Evitar que el clic en el botón active la edición
                    handleDelete(rol.rol_id);
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

export default RolesList;