using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Prueba1.Migrations
{
    /// <inheritdoc />
    public partial class Db1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Materias",
                columns: table => new
                {
                    Codigomateria = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Nombremateria = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    creditos = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Materias", x => x.Codigomateria);
                });

            migrationBuilder.CreateTable(
                name: "Modulos",
                columns: table => new
                {
                    IdModulo = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fehainix = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fechafin = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Modulos", x => x.IdModulo);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Cedula = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Apellido = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Roles = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Telefono = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Jornada = table.Column<int>(type: "int", nullable: true),
                    FechaContratacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EstaActivo = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Cedula);
                });

            migrationBuilder.CreateTable(
                name: "Asignaciones",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CedulaDocente = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Codigomateria = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PeriodoLectivo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Aula = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Carrera = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nivel = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Asignaciones", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Asignaciones_Materias_Codigomateria",
                        column: x => x.Codigomateria,
                        principalTable: "Materias",
                        principalColumn: "Codigomateria",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Asignaciones_Usuarios_CedulaDocente",
                        column: x => x.CedulaDocente,
                        principalTable: "Usuarios",
                        principalColumn: "Cedula",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Horarios",
                columns: table => new
                {
                    IdHorario = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdModulo = table.Column<int>(type: "int", nullable: false),
                    IdAsignacion = table.Column<int>(type: "int", nullable: false),
                    Diasem = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HoraI = table.Column<TimeSpan>(type: "time", nullable: false),
                    HoraF = table.Column<TimeSpan>(type: "time", nullable: false),
                    Horas = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Horarios", x => x.IdHorario);
                    table.ForeignKey(
                        name: "FK_Horarios_Asignaciones_IdAsignacion",
                        column: x => x.IdAsignacion,
                        principalTable: "Asignaciones",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Horarios_Modulos_IdModulo",
                        column: x => x.IdModulo,
                        principalTable: "Modulos",
                        principalColumn: "IdModulo",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Asignaciones_CedulaDocente",
                table: "Asignaciones",
                column: "CedulaDocente");

            migrationBuilder.CreateIndex(
                name: "IX_Asignaciones_Codigomateria",
                table: "Asignaciones",
                column: "Codigomateria");

            migrationBuilder.CreateIndex(
                name: "IX_Horarios_IdAsignacion",
                table: "Horarios",
                column: "IdAsignacion");

            migrationBuilder.CreateIndex(
                name: "IX_Horarios_IdModulo",
                table: "Horarios",
                column: "IdModulo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Horarios");

            migrationBuilder.DropTable(
                name: "Asignaciones");

            migrationBuilder.DropTable(
                name: "Modulos");

            migrationBuilder.DropTable(
                name: "Materias");

            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
