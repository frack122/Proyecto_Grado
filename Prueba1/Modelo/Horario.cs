using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Prueba1.Modelo
{
    public class Horario
    {
        [Key]
        public int IdHorario { get; set; }

        public int IdModulo { get; set; }
        [JsonIgnore]
        [ForeignKey("IdModulo")]
        public Modulo? Modulo { get; set; }
        
        public int IdAsignacion {  get; set; }
        [JsonIgnore]
        public AsignacionDocente? AsignacionDocente { get; set; }
        public string Diasem {  get; set; }

        public TimeSpan HoraI {  get; set; }
        public TimeSpan HoraF { get; set; }
        public int Horas {  get; set; }
    }
}
