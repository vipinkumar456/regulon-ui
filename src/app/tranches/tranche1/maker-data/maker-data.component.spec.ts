import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerDataComponent } from './maker-data.component';

describe('MakerDataComponent', () => {
  let component: MakerDataComponent;
  let fixture: ComponentFixture<MakerDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
