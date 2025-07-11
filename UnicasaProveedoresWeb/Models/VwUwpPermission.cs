using System;
using System.Collections.Generic;

namespace UnicasaProveedoresAPI.Models;

public partial class VwUwpPermission
{
    public int PermissionId { get; set; }

    public string PermissionName { get; set; } = null!;

    public string? CreatedBy { get; set; }

    public DateTime DateCreated { get; set; }

}
