using Microsoft.AspNetCore.Mvc;
using Prueba1.Data;
using Prueba1.Modelo;

namespace Prueba1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UsuarioContext _context;

        public AuthController(UsuarioContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult login([FromBody]LoginRequest model)
        {
            if(model==null)
            {
                return BadRequest("el modelo no llega y se volvio null");
            }
            var user = _context.Usuarios.FirstOrDefault(u=>u.Email==model.Email && u.Password == model.Password);

            if (user != null) 
            {
                return Ok(new
                {
                    token= "A9f#kL23@xPq9LmZ!2026SecureKey",
                    usuario = user.Nombre,
                    correo = user.Email
                });            
            }
            return Unauthorized(new { message = "Usuario y Contrase;a no son igual" });
        }

    }
}
