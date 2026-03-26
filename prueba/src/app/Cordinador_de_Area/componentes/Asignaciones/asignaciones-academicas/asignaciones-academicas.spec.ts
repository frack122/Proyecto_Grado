import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http'; // <--- Falta este
import { provideHttpClientTesting } from '@angular/common/http/testing'; // <--- Y este
import { provideRouter } from '@angular/router'; // Por si usas RouterLinks

import { AsignacionesAcademicas } from './asignaciones-academicas';

describe('AsignacionesAcademicas', () => {
  let component: AsignacionesAcademicas;
  let fixture: ComponentFixture<AsignacionesAcademicas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignacionesAcademicas],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]) // Es buena práctica tenerlo si el componente navega
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AsignacionesAcademicas);
    component = fixture.componentInstance;
    
    // Agregamos detectChanges para inicializar el componente
    fixture.detectChanges(); 
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});