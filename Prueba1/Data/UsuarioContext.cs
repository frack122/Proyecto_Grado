using Microsoft.EntityFrameworkCore;
using Prueba1.Modelo;

namespace Prueba1.Data
{
    public class UsuarioContext : DbContext
    {
        public UsuarioContext(DbContextOptions<UsuarioContext> options) : base(options) { }

        // Tablas de la base de datos
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Materia> Materias { get; set; }
        public DbSet<AsignacionDocente> Asignaciones { get; set; }

        public DbSet<Modulo> Modulos { get; set; }
        public DbSet<Horario> Horarios { get; set; }

    
           protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>()
                .HasKey(u => u.Cedula);

            modelBuilder.Entity<Usuario>()
                .Property(u => u.Roles)
                .HasConversion<string>();

            // Asignacion -> Usuario
            modelBuilder.Entity<AsignacionDocente>()
                .HasOne(a => a.Docente)
                .WithMany()
                .HasForeignKey(a => a.CedulaDocente);

            // Asignacion -> Materia
            modelBuilder.Entity<AsignacionDocente>()
                .HasOne(a => a.Materia)
                .WithMany()
                .HasForeignKey(a => a.Codigomateria);

            // 🔥 Horario -> Modulo (TE FALTABA)
            modelBuilder.Entity<Horario>()
                .HasOne(h => h.Modulo)
                .WithMany()
                .HasForeignKey(h => h.IdModulo);

            // 🔥 Horario -> AsignacionDocente (TE FALTABA)
            modelBuilder.Entity<Horario>()
                .HasOne(h => h.AsignacionDocente)
                .WithMany()
                .HasForeignKey(h => h.IdAsignacion);

            base.OnModelCreating(modelBuilder);
        }
    }
    }

