import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router'; // <--- Añade esto
import { GestionReporteria } from './gestion-reporteria';

describe('GestionReporteria', () => {
  let component: GestionReporteria;
  let fixture: ComponentFixture<GestionReporteria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionReporteria],
      providers: [
        provideRouter([]) // <--- Añade esto para solucionar el error NG0201
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionReporteria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});