import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailTrackingItemComponent } from './order-detail-tracking-item.component';

describe('OrderDetailTrackingItemComponent', () => {
  let component: OrderDetailTrackingItemComponent;
  let fixture: ComponentFixture<OrderDetailTrackingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailTrackingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailTrackingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
