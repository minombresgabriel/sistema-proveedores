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
    public class UWP_USERController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UWP_USERController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/UWP_USER
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsers()
        {
            var users = await _context.Users
                .Include(u => u.rol)         // Incluir la propiedad navegacional rol
                .Include(u => u.created_by)  // Incluir la propiedad navegacional created_by
                .Select(u => new UserDTO
                {
                    usuario_id = u.usuario_id,
                    usuario_name = u.usuario_name,
                    user_email = u.user_email,
                    user_username = u.user_username,
                    user_password = u.user_password,
                    user_status = u.user_status,
                    id_rol = u.id_rol,
                    rol_name = u.rol != null ? u.rol.rol_name : "Desconocido", // Nombre del rol
                    id_created_by = u.id_created_by,
                    creado_por = u.created_by != null ? u.created_by.usuario_name : "Desconocido", // Nombre del creador
                    date_created = u.date_created,
                    user_type = u.user_type
                })
                .ToListAsync();

            return Ok(users);
        }

        // GET: api/UWP_USER/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UWP_USER>> GetUser(int id)
        {
            var user = await _context.Users
                .Include(u => u.rol)
                .Include(u => u.created_by)
                .Include(u => u.empleado)
                .Include(u => u.proveedor)
                .FirstOrDefaultAsync(u => u.usuario_id == id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // POST: api/UWP_USER
        [HttpPost]
        public async Task<ActionResult<UWP_USER>> CreateUser(UWP_USER user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.usuario_id }, user);
        }

        // PUT: api/UWP_USER/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UWP_USER user)
        {
            if (id != user.usuario_id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    return StatusCode(500, "Error de concurrencia: " + ex.Message);
                }
            }

            return Ok(user);
        }

        // DELETE: api/UWP_USER/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok("Usuario eliminado correctamente");
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.usuario_id == id);
        }
    }
}