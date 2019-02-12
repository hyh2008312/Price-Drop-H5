import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingItemComponent } from './Tracking-item.component';

describe('TrackingItemComponent', () => {
  let component: TrackingItemComponent;
  let fixture: ComponentFixture<TrackingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
