using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UnicasaProveedoresWeb.Models;

namespace UnicasaProveedoresWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UWP_EMPLOYEEController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UWP_EMPLOYEEController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/UWP_EMPLOYEE
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDTO>>> GetEmployees()
        {
            var employees = await _context.Employees
                .Include(e => e.created_by) // Incluir la propiedad navegacional created_by
                .Include(e => e.user)       // Incluir la propiedad navegacional user
                .Select(e => new EmployeeDTO
                {
                    employee_id = e.employee_id,
                    employee_name = e.employee_name,
                    id_created_by = e.id_created_by,
                    creado_por = e.created_by != null ? e.created_by.usuario_name : "Desconocido", // Nombre del creador
                    date_created = e.date_created,
                    id_user = e.id_user,
                    usuario = e.user != null ? e.user.usuario_name : "Desconocido", // Nombre del usuario asociado
                    codigo_proveedor = e.codigo_proveedor
                })
                .ToListAsync();

            return Ok(employees);
        }

        // GET: api/UWP_EMPLOYEE/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UWP_EMPLOYEE>> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // POST: api/UWP_EMPLOYEE
        [HttpPost]
        public async Task<ActionResult<UWP_EMPLOYEE>> CreateEmployee(UWP_EMPLOYEE employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployee), new { id = employee.employee_id }, employee);
        }
        // PUT: api/UWP_EMPLOYEE/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, UWP_EMPLOYEE employee)
        {
            if (id != employee.employee_id)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/UWP_EMPLOYEE/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.employee_id == id);
        }
    }
}