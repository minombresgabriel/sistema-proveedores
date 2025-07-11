import React, { useEffect, useState } from 'react';
import { getRolPermissions, RolPermission } from './api';

const RolPermissionsList: React.FC = () => {
  const [rolPermissions, setRolPermissions] = useState<RolPermission[]>([]);

  useEffect(() => {
    const fetchRolPermissions = async () => {
      const data = await getRolPermissions();
      setRolPermissions(data);
    };

    fetchRolPermissions();
  }, []);

  return (
    <div>
      <h2>Lista de RolPermissions</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Rol</th>
            <th>Permiso</th>
            <th>Creado por</th>
            <th>Fecha de Creación</th>
          </tr>
        </thead>
        <tbody>
          {rolPermissions.map((rolPermission) => (
            <tr key={rolPermission.rol_permission_id}>
              <td>{rolPermission.rol_permission_id}</td>
              <td>{rolPermission.id_rol}</td>
              <td>{rolPermission.id_permission}</td>
              <td>{rolPermission.id_created_by}</td>
              <td>{new Date(rolPermission.date_created).toLocaleDateString()}</td> 

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RolPermissionsList;