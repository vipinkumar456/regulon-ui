import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsetexampleComponent } from './tabsetexample.component';

describe('TabsetexampleComponent', () => {
  let component: TabsetexampleComponent;
  let fixture: ComponentFixture<TabsetexampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsetexampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsetexampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
