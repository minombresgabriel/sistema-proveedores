using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UnicasaProveedoresWeb.Models
{
  public class UWP_PROVEEDOR
  {
    [Key]
    public int proveedor_id { get; set; }

    [Required]
    [StringLength(100)]
    public string? proveedor_name { get; set; }

    [Required]
    public int id_created_by { get; set; }

    [ForeignKey("id_created_by")]
    public virtual UWP_USER? created_by { get; set; }

    [Required]
    public DateTime date_created { get; set; }

    [Required]
    public int id_user { get; set; }

    [ForeignKey("id_user")]
    public virtual UWP_USER? user { get; set; }

    [StringLength(50)]
    public string? codigo_proveedor { get; set; }
  }
}