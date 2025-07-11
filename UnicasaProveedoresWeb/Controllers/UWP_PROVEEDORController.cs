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
    public class UWP_PROVEEDORController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UWP_PROVEEDORController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/UWP_PROVEEDOR
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProveedorDTO>>> GetProveedores()
        {
            var proveedores = await _context.Proveedores
                .Include(p => p.created_by) // Incluir la propiedad navegacional created_by
                .Include(p => p.user)       // Incluir la propiedad navegacional user
                .Select(p => new ProveedorDTO
                {
                    proveedor_id = p.proveedor_id,
                    proveedor_name = p.proveedor_name,
                    id_created_by = p.id_created_by,
                    creado_por = p.created_by != null ? p.created_by.usuario_name : "Desconocido", // Nombre del creador
                    date_created = p.date_created,
                    id_user = p.id_user,
                    usuario = p.user != null ? p.user.usuario_name : "Desconocido", // Nombre del usuario asociado
                    codigo_proveedor = p.codigo_proveedor
                })
                .ToListAsync();

            return Ok(proveedores);
        }

        // GET: api/UWP_PROVEEDOR/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UWP_PROVEEDOR>> GetProveedor(int id)
        {
            var proveedor = await _context.Proveedores.FindAsync(id);

            if (proveedor == null)
            {
                return NotFound();
            }

            return proveedor;
        }

        // POST: api/UWP_PROVEEDOR
        [HttpPost]
        public async Task<ActionResult<UWP_PROVEEDOR>> CreateProveedor(UWP_PROVEEDOR proveedor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Proveedores.Add(proveedor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProveedor), new { id = proveedor.proveedor_id }, proveedor);
        }

        // PUT: api/UWP_PROVEEDOR/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProveedor(int id, UWP_PROVEEDOR proveedor)
        {
            if (id != proveedor.proveedor_id)
            {
                return BadRequest();
            }

            _context.Entry(proveedor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProveedorExists(id))
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

        // DELETE: api/UWP_PROVEEDOR/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProveedor(int id)
        {
            var proveedor = await _context.Proveedores.FindAsync(id);
            if (proveedor == null)
            {
                return NotFound();
            }

            _context.Proveedores.Remove(proveedor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProveedorExists(int id)
        {
            return _context.Proveedores.Any(e => e.proveedor_id == id);
        }
    }
}