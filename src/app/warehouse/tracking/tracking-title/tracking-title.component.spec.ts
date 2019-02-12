import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingTitleComponent } from './tracking-title.component';

describe('TrackingTitleComponent', () => {
  let component: TrackingTitleComponent;
  let fixture: ComponentFixture<TrackingTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
