import React, { createContext, useContext, useState } from 'react';

interface ProveedorContextType {
  codigoProveedor: string;
  nombreProveedor: string;
  setCodigoProveedor: (codigo: string) => void;
  setProveedorSeleccionado: (codigo: string, nombre: string) => void;
}

const ProveedorContext = createContext<ProveedorContextType>({
  codigoProveedor: '',
  nombreProveedor: '',
  setCodigoProveedor: () => {},
  setProveedorSeleccionado: () => {}
});

export const ProveedorProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [codigoProveedor, setCodigoProveedor] = useState<string>('');
  const [nombreProveedor, setNombreProveedor] = useState<string>('');

  const setProveedorSeleccionado = (codigo: string, nombre: string) => {
    setCodigoProveedor(codigo);
    setNombreProveedor(nombre);
  };

  return (
    <ProveedorContext.Provider value={{ 
      codigoProveedor, 
      nombreProveedor,
      setCodigoProveedor,
      setProveedorSeleccionado
    }}>
      {children}
    </ProveedorContext.Provider>
  );
};

export const useProveedor = () => useContext(ProveedorContext);