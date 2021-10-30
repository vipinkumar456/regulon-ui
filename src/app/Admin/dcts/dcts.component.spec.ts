import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DctsComponent } from './dcts.component';

describe('DctsComponent', () => {
  let component: DctsComponent;
  let fixture: ComponentFixture<DctsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DctsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DctsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
