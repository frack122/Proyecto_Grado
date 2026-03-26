import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloAcademico } from './modulo-academico';

describe('ModuloAcademico', () => {
  let component: ModuloAcademico;
  let fixture: ComponentFixture<ModuloAcademico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuloAcademico],
    }).compileComponents();

    fixture = TestBed.createComponent(ModuloAcademico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
