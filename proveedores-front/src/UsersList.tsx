import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, User } from './api';
import UserForm from './UserForm'; // Importar el formulario

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showUserForm, setShowUserForm] = useState(false); // Estado para mostrar/ocultar el formulario


  // Cargar la lista de usuarios al montar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  // Función para eliminar un usuario con confirmación
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (confirmDelete) {
      await deleteUser(id);
      setUsers(users.filter((user) => user.usuario_id !== id)); // Actualizar la lista
    }
  };



  return (
    <div>
      <h2>Lista de Usuarios</h2>

      <button
        onClick={() => setShowUserForm(!showUserForm)}
        style={{ marginRight: '10px' }}
      >
        {showUserForm ? "Ocultar Formulario" : "Agregar Nuevo Usuario"}
      </button>

      {showUserForm && (
        <UserForm
          onSuccess={() => {
            setShowUserForm(false); // Cerrar el formulario
          }}
          onCancel={() => setShowUserForm(false)}
        />

      )}

      
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Username</th>
            <th>Estado</th>
            <th>Tipo</th>
            <th>Creado por</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.usuario_id}>
              <td>{user.usuario_name}</td>
              <td>{user.user_email || "-"}</td>
              <td>{user.user_username}</td>
              <td>{user.user_status ? "Activo" : "Inactivo"}</td>
              <td>{user.user_type}</td>
              <td>{user.id_created_by || "-"}</td>
              <td>{new Date(user.date_created).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Evitar que el clic en el botón active la edición
                    handleDelete(user.usuario_id);
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

export default UsersList;