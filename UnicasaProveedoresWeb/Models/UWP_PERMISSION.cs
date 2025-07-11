using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UnicasaProveedoresWeb.Models
{
    public class UWP_PERMISSION
    {
        [Key]
        public int permission_id { get; set; }

        [Required]
        [StringLength(100)]
        public string? permission_name { get; set; }

        [Required]
        public int id_created_by { get; set; }

        [ForeignKey("id_created_by")]
        public virtual UWP_USER? created_by { get; set; }

        [Required]
        public DateTime date_created { get; set; }

        public virtual ICollection<UWP_ROL_PERMISSION> rol_permission { get; set; } = new HashSet<UWP_ROL_PERMISSION>();
    }
}