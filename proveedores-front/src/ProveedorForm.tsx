import React, { useState, useEffect } from 'react';
import { createProveedor, Proveedor, getUsers, User } from './api';

interface ProveedorFormProps {
  onSuccess: () => void; // Función para ejecutar después de crear un proveedor
  onCancel: () => void; // Función para cancelar y cerrar el formulario
}

const ProveedorForm: React.FC<ProveedorFormProps> = ({ onSuccess, onCancel }) => {
  const [proveedor, setProveedor] = useState<Omit<Proveedor, 'proveedor_id'>>({
    proveedor_name: '',
    codigo_proveedor: '',
    id_user: 0,
    id_created_by: 1,
    date_created: new Date().toISOString(),
  });

  const [users, setUsers] = useState<User[]>([]); // Estado para almacenar la lista de usuarios

  // Obtener la lista de usuarios al montar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProveedor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createProveedor({
        ...proveedor,
        id_created_by: proveedor.id_created_by ? Number(proveedor.id_created_by) : null, // Asegurar que sea null si no se selecciona un valor
      }); // Enviar datos a la API
      onSuccess(); // Cerrar el formulario y actualizar la lista
      alert('Proveedor creado exitosamente');
    } catch (error) {
      console.error('Error al crear el proveedor:', error);
      alert('Hubo un error al crear el proveedor');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Nuevo Proveedor</h2>
      <div>
        <label>Nombre del Proveedor:</label>
        <input
          type="text"
          name="proveedor_name"
          value={proveedor.proveedor_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Código del Proveedor:</label>
        <input
          type="text"
          name="codigo_proveedor"
          value={proveedor.codigo_proveedor}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Usuario:</label>
        <select
          name="id_user"
          value={proveedor.id_user}
          onChange={handleChange}
          required
        >
          <option value={0}>Seleccione un usuario</option>
          {users.map((user) => (
            <option key={user.usuario_id} value={user.usuario_id}>
              {user.usuario_name} ({user.user_username})
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Crear Proveedor</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
        Cancelar
      </button>
    </form>
  );
};

export default ProveedorForm;