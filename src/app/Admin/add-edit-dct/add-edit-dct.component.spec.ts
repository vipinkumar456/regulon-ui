import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDctComponent } from './add-edit-dct.component';

describe('AddEditDctComponent', () => {
  let component: AddEditDctComponent;
  let fixture: ComponentFixture<AddEditDctComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditDctComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
