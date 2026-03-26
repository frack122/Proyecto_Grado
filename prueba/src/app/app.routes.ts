import { Routes } from '@angular/router';
import { AgregarProfesor } from './Cordinador_de_Area/componentes/agregar-profesor/agregar-profesor';
import { App } from './app';
import { Inicio } from './Cordinador_de_Area/inicio/inicio';
import { Materia } from './Cordinador_de_Area/componentes/materia/materia';
import { Login } from './login/login';
import { GestionReporteria } from './Cordinador_de_Area/componentes/gestion-reporteria/gestion-reporteria';
import { ModuloAcademico } from './Cordinador_de_Area/componentes/Modulos/modulo-academico/modulo-academico';
import { AsignacionesAcademicas } from './Cordinador_de_Area/componentes/Asignaciones/asignaciones-academicas/asignaciones-academicas';

export const routes: Routes = [
    {path:"",redirectTo:"/login",pathMatch:"full"},
    {path:"login",component:Login},
    {path:'inicio',component:Inicio},
    {path:'agregar-profesor',component:AgregarProfesor},
    {path:'materia',component:Materia},
    {path:'modulo-academico',component:ModuloAcademico},
    {path:'asignaciones-academicas',component:AsignacionesAcademicas},
    {path:'gestion-reporteria', component:GestionReporteria},
    {path:'**',redirectTo:''}
];
