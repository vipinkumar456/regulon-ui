import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedSummaryComponent } from './submitted-summary.component';

describe('SubmittedSummaryComponent', () => {
  let component: SubmittedSummaryComponent;
  let fixture: ComponentFixture<SubmittedSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmittedSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
