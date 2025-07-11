// types.ts
export interface Proveedor {
    proveedor_id: number;
    codigo_proveedor: string;
    nombre_proveedor: string;
    // Agrega otros campos que devuelva tu API si es necesario
  }
  
  export interface Producto {
    ITEMNMBR: string;
    ITEMDESC: string;
  }