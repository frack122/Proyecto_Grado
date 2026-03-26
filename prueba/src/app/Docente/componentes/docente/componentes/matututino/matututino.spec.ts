import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Matututino } from './matututino';

describe('Matututino', () => {
  let component: Matututino;
  let fixture: ComponentFixture<Matututino>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Matututino],
    }).compileComponents();

    fixture = TestBed.createComponent(Matututino);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
