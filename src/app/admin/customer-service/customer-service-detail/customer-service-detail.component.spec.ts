import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceDetailComponent } from './customer-service-detail.component';

describe('OrderDetailComponent', () => {
  let component: CustomerServiceDetailComponent;
  let fixture: ComponentFixture<CustomerServiceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerServiceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
