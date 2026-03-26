using System.ComponentModel.DataAnnotations;

namespace Prueba1.Modelo
{
    public class Materia
    {
        [Key]
        public string Codigomateria {  get; set; }

        public string Nombremateria { get; set; }

        public int creditos { get; set; }

    }
}
