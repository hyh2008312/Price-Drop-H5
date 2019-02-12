import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingTitleFixedComponent } from './tracking-title-fixed.component';

describe('TrackingTitleFixedComponent', () => {
  let component: TrackingTitleFixedComponent;
  let fixture: ComponentFixture<TrackingTitleFixedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingTitleFixedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingTitleFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
