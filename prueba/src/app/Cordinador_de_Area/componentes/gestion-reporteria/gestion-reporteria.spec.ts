import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionReporteria } from './gestion-reporteria';

describe('GestionReporteria', () => {
  let component: GestionReporteria;
  let fixture: ComponentFixture<GestionReporteria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionReporteria],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionReporteria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
