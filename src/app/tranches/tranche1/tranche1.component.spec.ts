import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tranche1Component } from './tranche1.component';

describe('Tranche1Component', () => {
  let component: Tranche1Component;
  let fixture: ComponentFixture<Tranche1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tranche1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tranche1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
