import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tranche2Component } from './tranche2.component';

describe('Tranche2Component', () => {
  let component: Tranche2Component;
  let fixture: ComponentFixture<Tranche2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tranche2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tranche2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
