using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization; // Asegúrate de agregar este using

namespace UnicasaProveedoresWeb.Models
{
    public class UWP_USER
    {
        [Key]
        public int usuario_id { get; set; }

        [Required]
        [StringLength(100)]
        public string? usuario_name { get; set; }

        [Required]
        [StringLength(100)]
        public string? user_email { get; set; }

        [Required]
        [StringLength(50)]
        public string? user_username { get; set; }

        [Required]
        [StringLength(255)]
        public string? user_password { get; set; }

        public bool user_status { get; set; }

        [Required]
        public int id_rol { get; set; }

        [ForeignKey("id_rol")]
        [JsonIgnore] // Excluir la propiedad rol de la serialización
        public virtual UWP_ROL? rol { get; set; }

        public int? id_created_by { get; set; }

        [ForeignKey("id_created_by")]
        [JsonIgnore] // Excluir la propiedad created_by de la serialización
        public virtual UWP_USER? created_by { get; set; }

        [Required]
        public DateTime date_created { get; set; }

        [StringLength(50)]
        public string? user_type { get; set; }

        [JsonIgnore] // Excluir la propiedad empleado de la serialización
        public virtual ICollection<UWP_EMPLOYEE> empleado { get; set; } = new HashSet<UWP_EMPLOYEE>();

        [JsonIgnore] // Excluir la propiedad proveedor de la serialización
        public virtual ICollection<UWP_PROVEEDOR> proveedor { get; set; } = new HashSet<UWP_PROVEEDOR>();
    }

}