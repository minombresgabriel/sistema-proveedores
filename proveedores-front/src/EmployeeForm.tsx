import React, { useState, useEffect } from 'react';
import { createEmployee, Employee, getUsers, User } from './api';

interface EmployeeFormProps {
  onSuccess: () => void; // Función para ejecutar después de crear un empleado
  onCancel: () => void; // Función para cancelar y cerrar el formulario
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSuccess, onCancel }) => {
  const [employee, setEmployee] = useState<Omit<Employee, 'employee_id'>>({
    employee_name: '',
    codigo_proveedor: '',
    id_user: 0,
    id_created_by: 1, // Valor por defecto (puedes cambiarlo según el usuario logueado)
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
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createEmployee(employee); // Enviar datos a la API
      onSuccess(); // Cerrar el formulario y actualizar la lista
      alert('Empleado creado exitosamente');
    } catch (error) {
      console.error('Error al crear el empleado:', error);
      alert('Hubo un error al crear el empleado');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Nuevo Empleado</h2>
      <div>
        <label>Nombre del Empleado:</label>
        <input
          type="text"
          name="employee_name"
          value={employee.employee_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Código del Proveedor:</label>
        <input
          type="text"
          name="codigo_proveedor"
          value={employee.codigo_proveedor}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>ID de Usuario:</label>
        <select
          name="id_user"
          value={employee.id_user}
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
      {/* Campo oculto para id_created_by */}
      <input
        type="hidden"
        name="id_created_by"
        value={employee.id_created_by}
      />
      <button type="submit">Crear Empleado</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
        Cancelar
      </button>
    </form>
  );
};

export default EmployeeForm;