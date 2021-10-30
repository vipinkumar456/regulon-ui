import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tranche1EditComponent } from './tranche1-edit.component';

describe('Tranche1EditComponent', () => {
  let component: Tranche1EditComponent;
  let fixture: ComponentFixture<Tranche1EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tranche1EditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tranche1EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
