using System;
using System.Collections.Generic;

namespace UnicasaProveedoresAPI.Models;

public partial class VwUwpRolPermission
{
    public int RolPermissionId { get; set; }

    public string? Rol { get; set; }

    public string? Permission { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime DateCreated { get; set; }

}
