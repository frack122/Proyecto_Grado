import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Diurno } from './diurno';

describe('Diurno', () => {
  let component: Diurno;
  let fixture: ComponentFixture<Diurno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Diurno],
    }).compileComponents();

    fixture = TestBed.createComponent(Diurno);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
