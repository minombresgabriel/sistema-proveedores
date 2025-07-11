using System;
using System.Collections.Generic;

namespace UnicasaProveedoresAPI.Models;

public partial class VwUwpProvedor
{

    public int ProveedorId { get; set; } // Nueva propiedad

    public string? ProveedorName { get; set; } // Eliminado = null!
    public string? Usuario { get; set; } // Eliminado string? y = null!
    public string? Email { get; set; } // Eliminado string? y = null!
    public bool Estado { get; set; } // Eliminado string? y = null!
}
