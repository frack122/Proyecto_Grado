using System.ComponentModel.DataAnnotations;

namespace Prueba1.Modelo
{
    public class Modulo
    {
        [Key]
        public int IdModulo { get; set; }

        [Required]
        public string Nombre { get; set; }

        public DateTime Fehainix { get; set; }

        public DateTime fechafin {  get; set; }

    }
}
