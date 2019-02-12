import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailTitleComponent } from './order-detail-title.component';

describe('OrderDetailTitleComponent', () => {
  let component: OrderDetailTitleComponent;
  let fixture: ComponentFixture<OrderDetailTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
