public class UserDTO
{
    public int usuario_id { get; set; }
    public string? usuario_name { get; set; }
    public string? user_email { get; set; }
    public string? user_username { get; set; }
    public string? user_password { get; set; }
    public bool user_status { get; set; }
    public int id_rol { get; set; }
    public string? rol_name { get; set; } // Nombre del rol
    public int? id_created_by { get; set; }
    public string? creado_por { get; set; } // Nombre del usuario que lo creó
    public DateTime date_created { get; set; }
    public string? user_type { get; set; }
}