import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
selector: 'app-registro-modulo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modulo-academico.html',
  styleUrl: './modulo-academico.css',
})
export class ModuloAcademico {
  private http = inject(HttpClient);
  private router = inject(Router);

  // Definición del formulario basado en tu modelo de C#
  moduloForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fehainix: new FormControl('', [Validators.required]),
    fechafin: new FormControl('', [Validators.required])
  });

  ngOnInit() {}

  guardarModulo() {
    if (this.moduloForm.valid) {
      const url = 'http://192.168.100.23:5183/api/Modulos';
      
      // Enviamos el objeto al backend
      this.http.post(url, this.moduloForm.value).subscribe({
        next: (res) => {
          console.log('Módulo guardado:', res);
          alert('Módulo registrado con éxito');
          this.router.navigate(['/inicio']);
        },
        error: (err) => {
          console.error('Error al guardar:', err);
          alert('Error al conectar con el servidor');
        }
      });
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

  cancelar() {
    this.router.navigate(['/inicio']);
  }
}
