import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../authService/auth.service';

@Component({
  selector: 'app-agregar-profesor',
  standalone:true,
  imports: [RouterModule,CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './agregar-profesor.html',
  styleUrl: './agregar-profesor.css',
})
export class AgregarProfesor {
 constructor(private route: Router , private http: HttpClient, private usuarioService:AuthService) {}
 //enviar al post

 guardar(form: any) {

    if (!form.valid) {
      alert("Formulario inválido");
      return;
    }

    // 🔥 Mapear correctamente los datos
    const data = {
      Cedula: form.value.cedula,
      Nombre: form.value.nombre,
      Apellido: form.value.apellido,
      Email: form.value.email,
      Password: form.value.password,
      Roles: Number(form.value.roles),
      Telefono: form.value.telefono,
      Jornada: Number(form.value.jornada),
      FechaContratacion: form.value.fechaContratacion,
      EstaActivo: true
    };

    console.log("ENVIANDO:", data);

    this.usuarioService.insertUsu(data).subscribe({
      next: (res) => {
        console.log("RESPUESTA:", res);
        alert("Usuario guardado correctamente");
      },
      error: (err) => {
        console.error("ERROR COMPLETO:", err);
        console.log("ERROR BACKEND:", err.error);
        alert("Error al guardar usuario");
      }
    });
  }
 
  // Regresar atras
  irPagina(): void {
    console.log('Se esta dirigiendo: Inicio');
    this.route.navigate(['']); 
  }

    Materia(mat:string):void{
    console.log("navegado a materias : ",mat);
    this.route.navigate([mat])
  }
}
