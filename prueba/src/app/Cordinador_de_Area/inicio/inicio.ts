import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Importa RouterModule

@Component({
  selector: 'app-inicio',
  standalone: true, // Asegúrate de que diga que es standalone
  imports: [RouterModule], // importacion de libreria para rrutas
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  constructor(private route: Router) {}

  // Navegacion hacia otra pagina
  irPagina(Titulo: string): void {
    console.log('Se esta dirigiendo:', Titulo);
    this.route.navigate([Titulo]); 
  }

  Materia(mat:string):void{
    console.log("navegado a materias : ",mat);
    this.route.navigate([mat])
  }

  irReporteria(rep: string):void{
    console.log("Navegando hacia la reporteria:",rep);
    this.route.navigate([rep])
  }
}
