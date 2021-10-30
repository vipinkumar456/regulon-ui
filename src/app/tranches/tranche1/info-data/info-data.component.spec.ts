import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDataComponent } from './info-data.component';

describe('InfoDataComponent', () => {
  let component: InfoDataComponent;
  let fixture: ComponentFixture<InfoDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
