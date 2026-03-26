namespace Prueba1.Modelo
{

    
        public class HorarioDto
        {
        public int IdModulo { get; set; }
        public string? NombreModulo { get; set; }

        public int IdAsignacion { get; set; }

        public string ?NombreDocente { get; set; }
        public string ?ApellidoDocente { get; set; }
        public string ?Carrera { get; set; }
        public string ?Aula { get; set; }
        public string ?Nivel { get; set; }

        public string ?Diasem { get; set; }
        public TimeSpan HoraI { get; set; }
        public TimeSpan HoraF { get; set; }
        public int Horas { get; set; }
    }
    }

