using System.ComponentModel.DataAnnotations;

namespace Prueba1.Modelo
{
    public enum TipoJornada
    {
        Completa,  //0    // 40 horas semanales habitualmente
        Parcial,   //1    // Menos de la jornada completa
        Reducida,  //2    // Por guarda legal o motivos de salud
        Nocturna,  //3    // Realizada entre las 10 PM y las 6 AM
    }
    public class Usuario
    {
        [Key]
        public string Cedula { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }
        public Rolusuario Roles { get; set; }
        public string Telefono { get; set; }

        public TipoJornada? Jornada { get; set; }
        public DateTime FechaContratacion { get; set; }
        public bool EstaActivo { get; set; } = true;


    }
}
