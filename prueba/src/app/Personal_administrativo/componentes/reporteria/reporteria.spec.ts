import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reporteria } from './reporteria';

describe('Reporteria', () => {
  let component: Reporteria;
  let fixture: ComponentFixture<Reporteria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reporteria],
    }).compileComponents();

    fixture = TestBed.createComponent(Reporteria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
