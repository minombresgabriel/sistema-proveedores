public class ProveedorDTO
{
    public int proveedor_id { get; set; }
    public string? proveedor_name { get; set; }
    public int id_created_by { get; set; }
    public string? creado_por { get; set; } // Nombre del usuario que lo creó
    public DateTime date_created { get; set; }
    public int id_user { get; set; }
    public string? usuario { get; set; } // Nombre del usuario asociado
    public string? codigo_proveedor { get; set; }
}