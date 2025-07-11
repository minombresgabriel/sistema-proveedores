using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UnicasaProveedoresWeb.Models
{
    public class UWP_ROL_PERMISSION
    {
        [Key]
        public int rol_permission_id { get; set; }

        [Required]
        public int id_rol { get; set; }

        [ForeignKey("id_rol")]
        public virtual UWP_ROL? rol { get; set; }

        [Required]
        public int id_permission { get; set; }

        [ForeignKey("id_permission")]
        public virtual UWP_PERMISSION? permission { get; set; }

        [Required]
        public int id_created_by { get; set; }

        [ForeignKey("id_created_by")]
        public virtual UWP_USER? created_by { get; set; }

        [Required]
        public DateTime date_created { get; set; }
    }
}