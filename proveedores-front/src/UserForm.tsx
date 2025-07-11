// src/components/UserForm.tsx
import React, { useState } from 'react';
import { createUser } from './api';
import { User } from './api';

interface UserFormProps {
  onSuccess: () => void; // Función para ejecutar después de crear el usuario
  onCancel: () => void; // Función para cerrar el formulario
}

const UserForm: React.FC<UserFormProps> = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<Omit<User, 'usuario_id'>>({
    usuario_name: '',
    user_email: '',
    user_username: '',
    user_password: '',
    user_status: true,
    user_type: 'PROVEEDOR', // Valor predeterminado permitido
    id_rol: 1,
    id_created_by: 1, //OJO ESTO ES AUTOMATICO CON EL INICIO DE SESION
    date_created: new Date().toISOString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(formData);
      onSuccess(); // Ejecutar la función de éxito (por ejemplo, cerrar el formulario y actualizar la lista)
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      alert("Error al crear el usuario. Por favor, verifica los datos e intenta nuevamente.");
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '20px' }}>
      <h2>Agregar Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="usuario_name"
            value={formData.usuario_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="user_email"
            value={formData.user_email || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="user_username"
            value={formData.user_username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="user_password"
            value={formData.user_password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tipo de Usuario:</label>
          <select
            name="user_type"
            value={formData.user_type}
            onChange={handleChange}
            required
          >
            <option value="PROVEEDOR">PROVEEDOR</option>
            <option value="EMPLEADO">EMPLEADO</option>
          </select>
        </div>
        <div>
          <label>Rol:</label>
          <input
            type="number"
            name="id_rol"
            value={formData.id_rol}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Estado:</label>
          <input
            type="checkbox"
            name="user_status"
            checked={formData.user_status}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Crear Usuario</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>Cancelar</button>
      </form>
    </div>
  );
};

export default UserForm;

/*

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
            setActiveList("usuarios"); // Mostrar la lista de usuarios actualizada
          }}
          onCancel={() => setShowUserForm(false)}
        />
      )}



*/