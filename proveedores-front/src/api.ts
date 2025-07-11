import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5075/api', // URL de tu API
});



export interface Proveedor {
  proveedor_id: number;
  proveedor_name: string;
  codigo_proveedor: string;
  id_user: number;
  id_created_by: number | null ;
  date_created: string;
}

export interface Employee {
  employee_id: number;
  employee_name: string;
  codigo_proveedor: string;
  id_user: number;
  id_created_by: number;
  date_created: string;
}

export interface User {
  usuario_id: number;
  usuario_name: string;
  user_email: string | null;
  user_username: string;
  user_password: string;
  user_status: boolean;
  user_type: string;
  id_rol: number;
  id_created_by: number | null;
  date_created: string;
}

export interface Rol {
  rol_id: number;
  rol_name: string;
  date_created: string;
}

export interface Permission {
  permission_id: number;
  permission_name: string;
  id_created_by: number;
  date_created: string;
}

export interface RolPermission {
  rol_permission_id: number;
  id_rol: number;
  id_permission: number;
  id_created_by: number;
  date_created: string;
}

// Obtener todos los proveedores--------------------------------------------
export const getProveedores = async (): Promise<Proveedor[]> => {
  const response = await api.get<Proveedor[]>('/Proveedores');
  return response.data;
};

//Crear un Proveedor
export const createProveedor = async (Proveedor: Omit<Proveedor, 'proveedor_id'>): Promise<Proveedor> => {
  const response = await api.post<Proveedor>('/Proveedores', Proveedor);
  return response.data;
};


// Eliminar un Proveedor por ID
export const deleteProveedor = async (id: number): Promise<void> => {
  await api.delete(`/Proveedores/${id}`);
};



// Obtener todos los empleados--------------------------------------------
export const getEmployees = async (): Promise<Employee[]> => {
  const response = await api.get<Employee[]>('/Employees');
  return response.data;
};

// Crear un Empleado
export const createEmployee = async (employee: Omit<Employee, 'employee_id'>): Promise<Employee> => {
  const response = await api.post<Employee>('/Employees', employee);
  return response.data;
};

// Eliminar un Empleado por ID
export const deleteEmployee = async (id: number): Promise<void> => {
  await api.delete(`/Employees/${id}`);
};


// Obtener todos los usuarios--------------------------------------------
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/Users');
  return response.data;
};

//Crear un Usuario
export const createUser = async (user: Omit<User, 'usuario_id'>): Promise<User> => {
  const response = await api.post<User>('/Users', user);
  return response.data;
};


// Eliminar un usuario por ID
export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/Users/${id}`);
};



// Obtener todos los roles-----------------------------------------
export const getRoles = async (): Promise<Rol[]> => {
  const response = await api.get<Rol[]>('/Roles');
  return response.data;
};


// Crear un Rol
export const createRol = async (rol: Omit<Rol, 'rol_id'>): Promise<Rol> => {
  const response = await api.post<Rol>('/Roles', rol);
  return response.data;
};

// Eliminar un Rol por ID
export const deleteRol = async (id: number): Promise<void> => {
  await api.delete(`/Roles/${id}`);
};

// Obtener todos los permisos-----------------------------------------
export const getPermissions = async (): Promise<Permission[]> => {
  const response = await api.get<Permission[]>('/Permissions');
  return response.data;
};

// Crear un Permiso
export const createPermission = async (permission: Omit<Permission, 'permission_id'>): Promise<Permission> => {
  const response = await api.post<Permission>('/Permissions', permission);
  return response.data;
};

// Eliminar un Permiso por ID
export const deletePermission = async (id: number): Promise<void> => {
  await api.delete(`/Permissions/${id}`);
};

// Obtener todas las relaciones Rol-Permiso--------------------------------
export const getRolPermissions = async (): Promise<RolPermission[]> => {
  const response = await api.get<RolPermission[]>('/RolPermissions');
  return response.data;
};

// Agrega esta interfaz para el login
export interface LoginResponse {
  token: string;
  user: User;
}

// Función para hacer login
export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/Auth/Login', {
    Username: username,
    Password: password,
  });
  return response.data;
};

// Interceptor para agregar el token a las solicitudes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Función para obtener la información del usuario actual
export const getCurrentUser = async (token: string): Promise<User> => {
  const response = await api.get<User>('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


export interface PagoEmitido {
  VENDORID: string;
  VENDNAME: string;
  VCHRNMBR: string;
  DOCTYPE: number;
  DOCDATE: string;
  DOCNUMBR: string;
  DOCAMNT: number;
  CHEKBKID: string;
}

export const fetchPagosEmitidos = async (
  vendorId: string,
  fechaInicio: string,
  fechaFin: string
): Promise<PagoEmitido[]> => {
  try {
    const response = await api.get<PagoEmitido[]>('/PagosEmitidos', {
      params: {
        vendorid: vendorId,
        fecha_ini: fechaInicio,
        fecha_fin: fechaFin
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pagos:', error);
    throw error;
  }
};


export interface PagoEnProceso {
  doctype: number;
  tipo: string;
  docnumbr: string;
  docdate: string;
  duedate: string;
  curncyid: string;
  docamnt: number;
}


export const fetchPagosEnProceso = async (vendorid: string): Promise<PagoEnProceso[]> => {
  try {
    const response = await api.get<PagoEnProceso[]>('/PagosEnProceso', {
      params: { vendorid }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pagos en proceso:', error);
    throw error;
  }
};


// Interfaces para Facturas Retenidas
export interface FacturaRetenida {
  docdate: string;
  docnumbr: string;
  doctype: number;
  duedate: string;
  curncyid: string;
  docamnt: number;
}

// Función para obtener facturas retenidas
// En tu archivo api.ts
export const fetchFacturasRetenidas = async (vendorid: string) => {
  const response = await api.get(`/FacturasRetenidas?vendorid=${vendorid}`);
  return response.data;
};
// Función para mapear tipos de documento (opcional)
export const mapTipoDocumento = (doctype: number): string => {
  const tipos: Record<number, string> = {
    1: 'Factura',
    2: 'Nota de Crédito',
    3: 'Nota de Débito',
    6: 'Pago'
    // Agrega más mapeos según necesites
  };
  return tipos[doctype] || `Tipo ${doctype}`;
};

// Agrega esta interfaz
export interface TransaccionRecibida {
  tipo: string;
  docNumero: string;
  fechaRecibido: string;
  fechaVencimiento: string;
  currency: string;
  subtotal: number;
}

// Función para obtener transacciones recibidas
export const fetchTransaccionesRecibidas = async (vendorid: string): Promise<TransaccionRecibida[]> => {
  try {
    const response = await api.get<TransaccionRecibida[]>('/TransaccionesRecibidas', {
      params: { vendorid }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching transacciones recibidas:', error);
    throw error;
  }
};

// Función para mapear tipos de documento
export const mapTipoTransaccion = (tipo: string): string => {
  const tipos: Record<string, string> = {
    'FAC': 'Factura',
    'CF': 'Crédito Fiscal',
    'NC': 'Nota de Crédito',
    'PAG': 'Pago'
  };
  return tipos[tipo] || tipo;
};

// Agrega esta interfaz
export interface TransaccionAbierta {
  doctype: number;
  tipo: string;
  docnumbr: string;
  docdate: string;
  duedate: string;
  curncyid: string;
  docamnt: number;
}

// Función para obtener transacciones abiertas
export const fetchTransaccionesAbiertas = async (vendorid: string): Promise<TransaccionAbierta[]> => {
  try {
    const response = await api.get<TransaccionAbierta[]>('/TransaccionesAbiertas', {
      params: { vendorid }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching transacciones abiertas:', error);
    throw error;
  }
};

// Función para mapear tipos de documento (actualizada)
export const mapTipoDocumentoAbierto = (tipo: string): string => {
  const tipos: Record<string, string> = {
    'FAC': 'Factura',
    'NC': 'Nota de Crédito'
    // Agregar más tipos según sea necesario
  };
  return tipos[tipo] || tipo;
};

// Agrega esta interfaz
export interface ProductoProveedor {
  itemnmbr: string;
  itemdesc: string;
}

// Función para obtener productos del proveedor
export const fetchProductosProveedor = async (vendorid: string): Promise<ProductoProveedor[]> => {
  try {
    const response = await api.get<ProductoProveedor[]>('/ProductosProveedor', {
      params: { vendorid }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching productos del proveedor:', error);
    throw error;
  }
};
