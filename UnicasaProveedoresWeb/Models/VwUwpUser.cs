using System;
using System.Collections.Generic;

namespace UnicasaProveedoresAPI.Models;

public partial class VwUwpUser
{
  public int usuario_id { get; set; }

    public string usuario_name { get; set; } = null!;

    public string? user_email { get; set; }

    public string user_username { get; set; } = null!;

    public string user_password { get; set; } = null!;

    public bool user_status { get; set; }

    public string user_type { get; set; } = null!;

    public string? rol { get; set; }

    public string? creado_por { get; set; }

    public DateTime date_created { get; set; }


}
