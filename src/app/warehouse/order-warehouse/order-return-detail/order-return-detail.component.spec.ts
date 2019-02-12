import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReturnDetailComponent } from './order-return-detail.component';

describe('OrderReturnDetailComponent', () => {
  let component: OrderReturnDetailComponent;
  let fixture: ComponentFixture<OrderReturnDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderReturnDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderReturnDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
