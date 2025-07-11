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
    public class UWP_ROLController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UWP_ROLController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/UWP_ROL
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RolDTO>>> GetRoles()
        {
            var roles = await _context.Roles
                .Select(r => new RolDTO
                {
                    rol_id = r.rol_id,
                    rol_name = r.rol_name,
                    date_created = r.date_created
                })
                .ToListAsync();

            return Ok(roles);
        }

        // GET: api/UWP_ROL/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UWP_ROL>> GetRole(int id)
        {
            var role = await _context.Roles.FindAsync(id);

            if (role == null)
            {
                return NotFound();
            }

            return role;
        }

        // POST: api/UWP_ROL
        [HttpPost]
        public async Task<ActionResult<UWP_ROL>> CreateRole(UWP_ROL role)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Roles.Add(role);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRole), new { id = role.rol_id }, role);
        }

        // PUT: api/UWP_ROL/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRole(int id, UWP_ROL role)
        {
            if (id != role.rol_id)
            {
                return BadRequest();
            }

            _context.Entry(role).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoleExists(id))
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

        // DELETE: api/UWP_ROL/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            var role = await _context.Roles.FindAsync(id);
            if (role == null)
            {
                return NotFound();
            }

            _context.Roles.Remove(role);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RoleExists(int id)
        {
            return _context.Roles.Any(e => e.rol_id == id);
        }
    }
}