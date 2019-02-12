import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailDialogComponent } from './order-detail-dialog.component';

describe('OrderDetailDialogComponent', () => {
  let component: OrderDetailDialogComponent;
  let fixture: ComponentFixture<OrderDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
