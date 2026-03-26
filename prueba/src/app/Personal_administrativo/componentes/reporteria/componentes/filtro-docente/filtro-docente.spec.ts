import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroDocente } from './filtro-docente';

describe('FiltroDocente', () => {
  let component: FiltroDocente;
  let fixture: ComponentFixture<FiltroDocente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroDocente],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltroDocente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
