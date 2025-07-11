public class PermissionDTO
{
    public int permission_id { get; set; }
    public string? permission_name { get; set; }
    public int id_created_by { get; set; }
    public string? creado_por { get; set; } // Nombre del usuario que lo creó
    public DateTime date_created { get; set; }
}