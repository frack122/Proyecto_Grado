using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Prueba1.Data;
using Prueba1.Modelo;

namespace Prueba1.Controllers
{
    [Route("api/Asignaciones")]
    [ApiController]
    public class AsignacionDocentesController : ControllerBase
    {
        private readonly UsuarioContext _context;

        public AsignacionDocentesController(UsuarioContext context)
        {
            _context = context;
        }

        // GET: api/AsignacionDocentes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetAsignaciones()
        {
            var asignaciones =  await _context.Asignaciones
                .Include(a => a.Docente)
                .Select(a => new
                {
                    Id = a.Id,
                    Nombre = a.Docente.Nombre + " " + a.Docente.Apellido
                })
                .ToListAsync();
            return Ok(asignaciones);
        }

        // GET: api/AsignacionDocentes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AsignacionDocente>> GetAsignacionDocente(int id)
        {
            var asignacionDocente = await _context.Asignaciones.FindAsync(id);

            if (asignacionDocente == null)
            {
                return NotFound();
            }

            return asignacionDocente;
        }

        // PUT: api/AsignacionDocentes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsignacionDocente(int id, AsignacionDocente asignacionDocente)
        {
            if (id != asignacionDocente.Id)
            {
                return BadRequest();
            }

            _context.Entry(asignacionDocente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AsignacionDocenteExists(id))
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

        // POST: api/AsignacionDocentes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AsignacionDocente>> PostAsignacionDocente(AsignacionDocente asignacionDocente)
        {
            _context.Asignaciones.Add(asignacionDocente);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAsignacionDocente", new { id = asignacionDocente.Id }, asignacionDocente);
        }

        // DELETE: api/AsignacionDocentes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsignacionDocente(int id)
        {
            var asignacionDocente = await _context.Asignaciones.FindAsync(id);
            if (asignacionDocente == null)
            {
                return NotFound();
            }

            _context.Asignaciones.Remove(asignacionDocente);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AsignacionDocenteExists(int id)
        {
            return _context.Asignaciones.Any(e => e.Id == id);
        }
    }
}
