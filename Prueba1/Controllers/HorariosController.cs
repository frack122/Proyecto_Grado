using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Prueba1.Data;
using Prueba1.Modelo;

namespace Prueba1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HorariosController : ControllerBase
    {
        private readonly UsuarioContext _context;

        public HorariosController(UsuarioContext context)
        {
            _context = context;
        }

        // ✅ GET: api/Horarios (CON DTO)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HorarioDto>>> GetHorarios()
        {
            var horarios = await _context.Horarios
                .Include(h => h.Modulo)
                .Include(h => h.AsignacionDocente)
                    .ThenInclude(a => a.Docente)
                .Select(h => new HorarioDto
                {
                    IdModulo = h.IdModulo,
                    NombreModulo = h.Modulo.Nombre,

                    IdAsignacion = h.IdAsignacion,

                    NombreDocente = h.AsignacionDocente.Docente.Nombre,
                    ApellidoDocente = h.AsignacionDocente.Docente.Apellido,
                    Carrera = h.AsignacionDocente.Carrera,
                    Aula = h.AsignacionDocente.Aula,
                    Nivel = h.AsignacionDocente.Nivel,

                    Diasem = h.Diasem,
                    HoraI = h.HoraI,
                    HoraF = h.HoraF,
                    Horas = h.Horas
                })
                .ToListAsync();

            return Ok(horarios);
        }

        // GET: api/Horarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Horario>> GetHorario(int id)
        {
            var horario = await _context.Horarios.FindAsync(id);

            if (horario == null)
            {
                return NotFound();
            }

            return horario;
        }

        // PUT: api/Horarios/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHorario(int id, Horario horario)
        {
            if (id != horario.IdHorario)
            {
                return BadRequest();
            }

            _context.Entry(horario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HorarioExists(id))
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

        // ✅ POST: api/Horarios (USANDO DTO)
        [HttpPost]
        public async Task<IActionResult> PostHorario(HorarioDto dto)
        {
            // ✅ VALIDAR ASIGNACIÓN
            var existeAsignacion = await _context.Asignaciones
                .AnyAsync(a => a.Id == dto.IdAsignacion);

            if (!existeAsignacion)
            {
                return BadRequest($"La asignación {dto.IdAsignacion} no existe");
            }

            // ✅ VALIDAR MÓDULO
            var existeModulo = await _context.Modulos
                .AnyAsync(m => m.IdModulo == dto.IdModulo);

            if (!existeModulo)
            {
                return BadRequest($"El módulo {dto.IdModulo} no existe");
            }

            // ✅ CREAR HORARIO
            var horario = new Horario
            {
                IdModulo = dto.IdModulo,
                IdAsignacion = dto.IdAsignacion,
                Diasem = dto.Diasem,
                HoraI = dto.HoraI,
                HoraF = dto.HoraF,
                Horas = dto.Horas
            };

            _context.Horarios.Add(horario);
            await _context.SaveChangesAsync();

            return Ok(new { mensaje = "Horario creado correctamente" });
        }

        // DELETE: api/Horarios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHorario(int id)
        {
            var horario = await _context.Horarios.FindAsync(id);
            if (horario == null)
            {
                return NotFound();
            }

            _context.Horarios.Remove(horario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HorarioExists(int id)
        {
            return _context.Horarios.Any(e => e.IdHorario == id);
        }
    }
}