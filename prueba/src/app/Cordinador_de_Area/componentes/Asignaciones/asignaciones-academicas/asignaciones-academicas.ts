import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-gestion-asignaciones',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './asignaciones-academicas.html',
  styleUrl: './asignaciones-academicas.css',
})
export class AsignacionesAcademicas implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);

  asignaciones: any[] = [];
  listaDocentes: any[] = []; 
  listaMaterias: any[] = []; 
  
  loading: boolean = false;
  apiBase = 'http://192.168.100.23:5183/api'; 

  nuevaAsignacion = {
    cedulaDocente: '',
    codigomateria: '',
    periodoLectivo: '',
    aula: '',
    carrera: '',
    nivel: ''
  };

  ngOnInit() {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales() {
    this.loading = true;
    // Ejecutamos las cargas. 
    // Nota: loading pasará a false cuando cargarAsignaciones termine.
    this.cargarAsignaciones();
    this.cargarDocentes();
    this.cargarMaterias();
  }

  cargarAsignaciones() {
    this.http.get<any[]>(`${this.apiBase}/Asignaciones`)
      .subscribe({
        next: (data) => {
          this.asignaciones = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar asignaciones:', err);
          this.loading = false;
        }
      });
  }

  // Ajustado: Ahora apunta a Usuarios para traer las cédulas
  cargarDocentes() {
    this.http.get<any[]>(`${this.apiBase}/Usuarios`)
      .subscribe({
        next: (data) => {
          this.listaDocentes = data;
          console.log('Docentes cargados correctamente');
        },
        error: (err) => console.error('Error al cargar docentes desde Usuarios:', err)
      });
  }

  // Ajustado: Apunta a Materias para traer los códigos
  cargarMaterias() {
    this.http.get<any[]>(`${this.apiBase}/Materias`)
      .subscribe({
        next: (data) => {
          this.listaMaterias = data;
          console.log('Materias cargadas correctamente');
        },
        error: (err) => console.error('Error al cargar materias:', err)
      });
  }

  agregarAsignacion() {
    // Validación de seguridad
    if (!this.nuevaAsignacion.cedulaDocente || !this.nuevaAsignacion.codigomateria) {
      alert('⚠️ Por favor seleccione un Docente (Cédula) y una Materia (Código)');
      return;
    }

    this.loading = true;
    this.http.post(`${this.apiBase}/Asignaciones`, this.nuevaAsignacion)
      .subscribe({
        next: (res) => {
          alert('✅ Asignación registrada con éxito');
          this.resetFormulario();
          this.cargarAsignaciones();
        },
        error: (err) => {
          console.error('Error al registrar:', err);
          alert('❌ No se pudo registrar. Verifique que la Cédula o el Código existan.');
          this.loading = false;
        }
      });
  }

  resetFormulario() {
    this.nuevaAsignacion = {
      cedulaDocente: '',
      codigomateria: '',
      periodoLectivo: '',
      aula: '',
      carrera: '',
      nivel: ''
    };
  }

  irAlPanel() {
    this.router.navigate(['/gestion-reporteria']);
  }
}