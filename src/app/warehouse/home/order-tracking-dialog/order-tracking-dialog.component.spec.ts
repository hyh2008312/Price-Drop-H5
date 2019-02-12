import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTrackingDialogComponent } from './order-tracking-dialog.component';

describe('OrderTrackingDialogComponent', () => {
  let component: OrderTrackingDialogComponent;
  let fixture: ComponentFixture<OrderTrackingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTrackingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTrackingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
