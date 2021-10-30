import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPopUpComponent } from './confirm-pop-up.component';

describe('ConfirmPopUpComponent', () => {
  let component: ConfirmPopUpComponent;
  let fixture: ComponentFixture<ConfirmPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
