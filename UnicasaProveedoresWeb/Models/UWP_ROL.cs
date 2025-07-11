using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace UnicasaProveedoresWeb.Models
{
    public class UWP_ROL
    {
        [Key]
        public int rol_id { get; set; }

        public string? rol_name { get; set; }

        public DateTime date_created { get; set; }

        public virtual ICollection<UWP_ROL_PERMISSION> rol_permission { get; set; } = new HashSet<UWP_ROL_PERMISSION>();
    }
}