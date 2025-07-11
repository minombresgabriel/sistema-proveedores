import React, { useState } from 'react';
import { createPermission, Permission } from './api';

interface PermissionFormProps {
  onSuccess: () => void; // Función para ejecutar después de crear un permiso
  onCancel: () => void; // Función para cancelar y cerrar el formulario
}

const PermissionForm: React.FC<PermissionFormProps> = ({ onSuccess, onCancel }) => {
  const [permission, setPermission] = useState<Omit<Permission, 'permission_id'>>({
    permission_name: '',
    id_created_by: 1, // Valor por defecto (puedes cambiarlo según el usuario logueado)
    date_created: new Date().toISOString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPermission((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createPermission(permission); // Enviar datos a la API
      onSuccess(); // Cerrar el formulario y actualizar la lista
      alert('Permiso creado exitosamente');
    } catch (error) {
      console.error('Error al crear el permiso:', error);
      alert('Hubo un error al crear el permiso');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Nuevo Permiso</h2>
      <div>
        <label>Nombre del Permiso:</label>
        <input
          type="text"
          name="permission_name"
          value={permission.permission_name}
          onChange={handleChange}
          required
        />
      </div>
      {/* Campo oculto para id_created_by */}
      <input
        type="hidden"
        name="id_created_by"
        value={permission.id_created_by}
      />
      <button type="submit">Crear Permiso</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
        Cancelar
      </button>
    </form>
  );
};

export default PermissionForm;