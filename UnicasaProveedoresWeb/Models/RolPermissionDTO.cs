public class RolPermissionDTO
{
    public int rol_permission_id { get; set; }
    public int id_rol { get; set; }
    public string? rol_name { get; set; } // Nombre del rol
    public int id_permission { get; set; }
    public string? permission_name { get; set; } // Nombre del permiso
    public int id_created_by { get; set; }
    public string? creado_por { get; set; } // Nombre del usuario que lo creó
    public DateTime date_created { get; set; }
}