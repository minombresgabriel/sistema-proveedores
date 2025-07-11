import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, LoginResponse, User, getCurrentUser } from './api'; // Importa getCurrentUser
import jwtDecode from 'jwt-decode';

interface DecodedToken {
  exp: number; // Fecha de expiración en formato timestamp
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Función para verificar si el token ha expirado
const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000; // Convertir a segundos
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return true; // Considerar el token como expirado si hay un error
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  // useEffect para verificar y restaurar el token y el usuario al cargar la aplicación
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !isTokenExpired(storedToken)) {
      setToken(storedToken);

      // Obtener la información del usuario desde el backend
      const fetchUser = async () => {
        try {
          const userData = await getCurrentUser(storedToken); // Usar la función getCurrentUser
          setUser(userData); // Actualizar el estado del usuario
        } catch (error) {
          console.error('Error al obtener la información del usuario:', error);
          localStorage.removeItem('token'); // Eliminar el token si hay un error
        }
      };

      fetchUser();
    } else {
      localStorage.removeItem('token'); // Eliminar el token si ha expirado
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const data = await apiLogin(username, password);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token); // Guardar el token en localStorage
    } catch (error) {
      console.error('Error en el login:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token'); // Eliminar el token del localStorage
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};