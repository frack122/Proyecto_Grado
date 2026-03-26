import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Horario } from '../Cordinador_de_Area/componentes/gestion-reporteria/models/horario';

@Injectable({ providedIn: 'root' })

export class AuthService {
  private http = inject(HttpClient);
  private url = 'http://192.168.100.23:5183/api/auth/login'; // Tu URL de C#
  private url2 = 'http://192.168.100.23:5183/api/Usuarios';
  private ur3='http://192.168.100.23:5183/api/Materias';
  private url3 = 'http://192.168.100.23:5183/api/Horarios'

  insertUsu(data:any){
    return this.http.post(this.url2,data);
  }

  insertMateria(data:any){
    return this.http.post(this.ur3,data)
  }
///Metodo constructor 
  constructor( http:HttpClient){}
   // Metodo para la creada de horario
   
    DistribucionHora(data:any):Observable<any>{
      return this.http.post(this.url3,data)
    }

    //Obtener la asignacion 
    getCalendario():Observable<any>{
      return this.http.get<Horario[]>(this.url3)
    }
  login(credentials: any) {
    return this.http.post(this.url, credentials).pipe(
      tap((res: any) => {
        // Guardamos el token para que el usuario no tenga que loguearse de nuevo
        localStorage.setItem('token', res.token);
        localStorage.setItem('usuario', res.usuario);
      })
    );
  }

  logout() {
    localStorage.clear();
  }


}