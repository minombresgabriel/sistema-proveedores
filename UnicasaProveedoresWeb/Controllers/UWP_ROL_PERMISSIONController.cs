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
    public class UWP_ROL_PERMISSIONController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UWP_ROL_PERMISSIONController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/UWP_ROL_PERMISSION
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RolPermissionDTO>>> GetRolPermissions()
        {
            var rolPermissions = await _context.RolPermissions
                .Include(rp => rp.rol)         // Incluir la propiedad navegacional rol
                .Include(rp => rp.permission)  // Incluir la propiedad navegacional permission
                .Include(rp => rp.created_by)  // Incluir la propiedad navegacional created_by
                .Select(rp => new RolPermissionDTO
                {
                    rol_permission_id = rp.rol_permission_id,
                    id_rol = rp.id_rol,
                    rol_name = rp.rol != null ? rp.rol.rol_name : "Desconocido", // Nombre del rol
                    id_permission = rp.id_permission,
                    permission_name = rp.permission != null ? rp.permission.permission_name : "Desconocido", // Nombre del permiso
                    id_created_by = rp.id_created_by,
                    creado_por = rp.created_by != null ? rp.created_by.usuario_name : "Desconocido", // Nombre del creador
                    date_created = rp.date_created
                })
                .ToListAsync();

            return Ok(rolPermissions);
        }
        // GET: api/UWP_ROL_PERMISSION/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UWP_ROL_PERMISSION>> GetRolPermission(int id)
        {
            var rolPermission = await _context.RolPermissions.FindAsync(id);

            if (rolPermission == null)
            {
                return NotFound();
            }

            return rolPermission;
        }

        // POST: api/UWP_ROL_PERMISSION
        [HttpPost]
        public async Task<ActionResult<UWP_ROL_PERMISSION>> CreateRolPermission(UWP_ROL_PERMISSION rolPermission)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.RolPermissions.Add(rolPermission);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRolPermission), new { id = rolPermission.rol_permission_id }, rolPermission);
        }
        // PUT: api/UWP_ROL_PERMISSION/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRolPermission(int id, UWP_ROL_PERMISSION rolPermission)
        {
            if (id != rolPermission.rol_permission_id)
            {
                return BadRequest();
            }

            _context.Entry(rolPermission).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RolPermissionExists(id))
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

        // DELETE: api/UWP_ROL_PERMISSION/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRolPermission(int id)
        {
            var rolPermission = await _context.RolPermissions.FindAsync(id);
            if (rolPermission == null)
            {
                return NotFound();
            }

            _context.RolPermissions.Remove(rolPermission);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RolPermissionExists(int id)
        {
            return _context.RolPermissions.Any(e => e.rol_permission_id == id);
        }
    }
}