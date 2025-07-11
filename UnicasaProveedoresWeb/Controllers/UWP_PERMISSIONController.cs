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
    public class UWP_PERMISSIONController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UWP_PERMISSIONController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/UWP_PERMISSION
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PermissionDTO>>> GetPermissions()
        {
            var permissions = await _context.Permissions
                .Include(p => p.created_by) // Incluir la propiedad navegacional created_by
                .Select(p => new PermissionDTO
                {
                    permission_id = p.permission_id,
                    permission_name = p.permission_name,
                    id_created_by = p.id_created_by,
                    creado_por = p.created_by != null ? p.created_by.usuario_name : "Desconocido", // Nombre del creador
                    date_created = p.date_created
                })
                .ToListAsync();

            return Ok(permissions);
        }

        // GET: api/UWP_PERMISSION/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UWP_PERMISSION>> GetPermission(int id)
        {
            var permission = await _context.Permissions.FindAsync(id);

            if (permission == null)
            {
                return NotFound();
            }

            return permission;
        }

        // POST: api/UWP_PERMISSION
        [HttpPost]
        public async Task<ActionResult<UWP_PERMISSION>> CreatePermission(UWP_PERMISSION permission)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Permissions.Add(permission);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPermission), new { id = permission.permission_id }, permission);
        }
        // PUT: api/UWP_PERMISSION/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePermission(int id, UWP_PERMISSION permission)
        {
            if (id != permission.permission_id)
            {
                return BadRequest();
            }

            _context.Entry(permission).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PermissionExists(id))
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

        // DELETE: api/UWP_PERMISSION/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePermission(int id)
        {
            var permission = await _context.Permissions.FindAsync(id);
            if (permission == null)
            {
                return NotFound();
            }

            _context.Permissions.Remove(permission);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PermissionExists(int id)
        {
            return _context.Permissions.Any(e => e.permission_id == id);
        }
    }
}