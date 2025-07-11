import React, { useState } from 'react';
import { createRol, Rol } from './api';

interface RolFormProps {
  onSuccess: () => void; // Función para ejecutar después de crear un rol
  onCancel: () => void; // Función para cancelar y cerrar el formulario
}

const RolForm: React.FC<RolFormProps> = ({ onSuccess, onCancel }) => {
  const [rol, setRol] = useState<Omit<Rol, 'rol_id'>>({
    rol_name: '',
    date_created: new Date().toISOString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRol((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createRol(rol); // Enviar datos a la API
      onSuccess(); // Cerrar el formulario y actualizar la lista
      alert('Rol creado exitosamente');
    } catch (error) {
      console.error('Error al crear el rol:', error);
      alert('Hubo un error al crear el rol');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Nuevo Rol</h2>
      <div>
        <label>Nombre del Rol:</label>
        <input
          type="text"
          name="rol_name"
          value={rol.rol_name}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Crear Rol</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
        Cancelar
      </button>
    </form>
  );
};

export default RolForm;