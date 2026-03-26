import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Importa RouterModule
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../authService/auth.service';


@Component({
  selector: 'app-materia',
  standalone:true,
  imports: [RouterModule,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './materia.html',
  styleUrl: './materia.css',
})

export class Materia {

   constructor(private route: Router, private http: HttpClient, private materia:AuthService) {}

  // Navegacion hacia otra pagina
  irPagina(): void {
    console.log('Se esta dirigiendo:',);
    this.route.navigate(['']); 
  }

  Docente(doc: string):void{
    console.log('Iendo a maestro:',doc)
    this.route.navigate([doc])
  }
  
 guardar(form: any) {

    if (!form.valid) {
      alert("Formulario inválido");
      return;
    }
    const data={
      Codigomateria: form.value.Codigomateria, // Coincide con el name="Codigomateria" del HTML
      Nombremateria: form.value.Nombremateria,
      Creditos: Number(form.value.creditos),   // Forzamos a que sea número por si acaso
      EstaActivo: true                         // Valor por defecto si tu API lo requiere
    }
    console.log("ENVIANDO:", data);

    this.materia.insertMateria(data).subscribe({
      next: (res) => {
        console.log("RESPUESTA:", res);
        alert("Materia Guardada");
      },
      error: (err) => {
        console.error("ERROR COMPLETO:", err);
        console.log("ERROR BACKEND:", err.error);
        alert("Error al guardar Materia");
      }
    });
}

}
