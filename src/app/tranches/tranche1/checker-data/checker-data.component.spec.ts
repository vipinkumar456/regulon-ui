import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckerDataComponent } from './checker-data.component';

describe('CheckerDataComponent', () => {
  let component: CheckerDataComponent;
  let fixture: ComponentFixture<CheckerDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckerDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
