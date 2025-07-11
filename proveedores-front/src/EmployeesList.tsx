import React, { useEffect, useState } from 'react';
import { getEmployees, Employee, deleteEmployee } from './api';
import EmployeeForm from './EmployeeForm'; // Importar el formulario

const EmployeesList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false); // Estado para mostrar/ocultar el formulario

  // Cargar la lista de empleados al montar el componente
  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getEmployees();
      setEmployees(data);
    };

    fetchEmployees();
  }, []);

  // Función para eliminar un empleado con confirmación
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este empleado?');
    if (confirmDelete) {
      await deleteEmployee(id);
      setEmployees(employees.filter((employee) => employee.employee_id !== id)); // Actualizar la lista
    }
  };

  // Función para manejar la creación exitosa de un empleado
  const handleEmployeeCreated = async () => {
    const data = await getEmployees(); // Recargar la lista de empleados
    setEmployees(data);
    setShowEmployeeForm(false); // Ocultar el formulario
  };

  return (
    <div>
      <h2>Lista de Empleados</h2>

      <button
        onClick={() => setShowEmployeeForm(!showEmployeeForm)}
        style={{ marginRight: '10px' }}
      >
        {showEmployeeForm ? 'Ocultar Formulario' : 'Agregar Nuevo Empleado'}
      </button>

      {showEmployeeForm && (
        <EmployeeForm
          onSuccess={handleEmployeeCreated} // Actualizar la lista y ocultar el formulario
          onCancel={() => setShowEmployeeForm(false)} // Ocultar el formulario sin hacer nada
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
            <th>Fecha de Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employee_id}>
              <td>{employee.employee_id}</td>
              <td>{employee.employee_name}</td>
              <td>{employee.codigo_proveedor}</td>
              <td>{employee.id_user}</td>
              <td>{employee.id_created_by}</td>
              <td>{new Date(employee.date_created).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Evitar que el clic en el botón active la edición
                    handleDelete(employee.employee_id);
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

export default EmployeesList;