using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Prueba1.Modelo
{
    public class AsignacionDocente
    {
        [Key]
        public int Id { get; set; }

        // Relación con Docente (Foreign Key)
        [Required]
        public string CedulaDocente { get; set; }
        [ForeignKey("CedulaDocente")]
        [JsonIgnore]
        public virtual Usuario? Docente { get; set; }

        // Relación con Materia (Foreign Key)
        [Required]
        public string Codigomateria { get; set; }
        [ForeignKey("Codigomateria")]
        [JsonIgnore]
        public virtual Materia? Materia { get; set; }

        // Datos extra de la asignación
        public string PeriodoLectivo { get; set; } // Ejemplo: "2024-1"
        public string Aula { get; set; }

        public string Carrera {  get; set; }

        public string Nivel {  get; set; }
    }
}
