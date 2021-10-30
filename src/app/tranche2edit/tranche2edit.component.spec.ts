import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tranche2editComponent } from './tranche2edit.component';

describe('Tranche2editComponent', () => {
  let component: Tranche2editComponent;
  let fixture: ComponentFixture<Tranche2editComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tranche2editComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tranche2editComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
