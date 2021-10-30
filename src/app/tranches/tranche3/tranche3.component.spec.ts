import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tranche3Component } from './tranche3.component';

describe('Tranche3Component', () => {
  let component: Tranche3Component;
  let fixture: ComponentFixture<Tranche3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tranche3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tranche3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
