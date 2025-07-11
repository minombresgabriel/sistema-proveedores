using System;
using System.Collections.Generic;

namespace UnicasaProveedoresAPI.Models;

public partial class VwUwpEmployee
{
    public int EmployeeId { get; set; }

    public string? EmployeeName { get; set; } = null!;

    public string? EmployeeUser { get; set; }

    public string? EmployeeEmail { get; set; }

    public bool EmployeeStatus { get; set; }

    public DateTime DateCreated { get; set; }

}
