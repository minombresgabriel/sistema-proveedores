public class EmployeeDTO
{
    public int employee_id { get; set; }
    public string? employee_name { get; set; }
    public int id_created_by { get; set; }
    public string? creado_por { get; set; } // Nombre del usuario que lo creó
    public DateTime date_created { get; set; }
    public int id_user { get; set; }
    public string? usuario { get; set; } // Nombre del usuario asociado
    public string? codigo_proveedor { get; set; }
}