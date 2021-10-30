import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tranche2MakerDataComponent } from './maker-data.component';

describe('MakerDataComponent', () => {
  let component: Tranche2MakerDataComponent;
  let fixture: ComponentFixture<Tranche2MakerDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tranche2MakerDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tranche2MakerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
