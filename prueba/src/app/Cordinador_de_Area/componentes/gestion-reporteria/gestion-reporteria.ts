import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../authService/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Horario } from './models/horario';

@Component({
  selector: 'app-gestion-reporteria',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './gestion-reporteria.html',
  styleUrls: ['./gestion-reporteria.css'],
})
export class GestionReporteria implements OnInit {

  private http = inject(HttpClient);
  private horaservice = inject(AuthService);
  private route = inject(Router);

  // --- NUEVAS VARIABLES PARA LOS SELECTORES ---
  horarios: Horario[] = [];
  modulos: any[] = [];
  asignaciones: any[] = [];
  loading: boolean = true;

  cronograma = {
    idModulo: null, // Cambiado a null para que el "Seleccione..." funcione
    idAsignacion: null,
    diasem: '',
    horaI: '',
    horas: 0
  };

  ngOnInit() {
    this.cargarHorarios();
    this.cargarModulos(); // Cargamos los módulos al iniciar
  }

  // Carga la tabla principal
    cargarHorarios() {
      this.loading = true; // Empieza la carga
      this.http.get<any[]>('http://192.168.100.23:5183/api/Horarios')
        .subscribe({
          next: (data) => {
            this.horarios = data;
            this.loading = false; // ¡Importante! Quita la carga
          },
          error: (err) => {
            console.error(err);
            this.loading = false; // ¡Importante! También aquí si falla
          }
        });
    }

  // --- NUEVA FUNCIÓN: Carga la lista de módulos ---
cargarModulos() {
  this.http.get<any[]>('http://192.168.100.23:5183/api/Modulos')
    .subscribe({
      next: (data) => {
        this.modulos = data;
        console.log('Módulos cargados:', this.modulos);
      },
      error: (err) => {
        console.error('Error al cargar módulos:', err);
      }
    });
}
  // --- NUEVA FUNCIÓN: Se ejecuta cuando cambias el módulo en el HTML ---
  cargarAsignaciones() {
    if (this.cronograma.idModulo) {
      // Ajusta esta URL. Normalmente filtrarías asignaciones por el ID del módulo seleccionado
      this.http.get<any[]>(`http://192.168.100.23:5183/api/Asignaciones`) 
        .subscribe(data => this.asignaciones = data);
    }
  }

  SenEnviar() {
    if (!this.cronograma.idModulo || !this.cronograma.idAsignacion) {
      alert('Por favor seleccione Módulo y Asignación');
      return;
    }

    this.horaservice.DistribucionHora(this.cronograma).subscribe({
      next: (res) => {
        console.log("Se ha guardado correctamente", res);
        this.cargarHorarios();
        // Limpiar formulario opcionalmente
        this.cronograma.diasem = '';
        this.cronograma.horas = 0;
      },
      error: (err) => console.error('Error al enviar:', err)
    });
  }

  exportToExcel() {
    if (!this.horarios.length) {
      alert('No hay datos para exportar');
      return;
    }

 const datosExcel = this.horarios.map((h: any) => {
  return {
    'Módulo': h.nombreModulo || 'N/A',
    'Docente': h.nombreDocente || 'N/A', // Cambiado para coincidir con tu consola
    'Carrera': h.carrera || 'N/A',
    'Nivel': h.nivel || 'N/A',
    'Aula': h.aula || 'N/A',
    'Día': h.diasem || 'N/A',
    'Hora Inicio': h.horaI || 'N/A',
    'Total Horas': h.horas || 0
  };
});
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExcel);
    ws['!cols'] = [
      { wch: 20 }, { wch: 30 }, { wch: 25 }, { wch: 10 }, 
      { wch: 10 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 10 }
    ];

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Horarios_ISTQ');

    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });

    saveAs(data, `Reporte_Horarios_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }
}