import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProfesor } from './agregar-profesor';

describe('AgregarProfesor', () => {
  let component: AgregarProfesor;
  let fixture: ComponentFixture<AgregarProfesor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarProfesor],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarProfesor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
