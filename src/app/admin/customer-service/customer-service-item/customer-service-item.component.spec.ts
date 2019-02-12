import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceItemComponent } from './customer-service-item.component';

describe('ProductItemComponent', () => {
  let component: CustomerServiceItemComponent;
  let fixture: ComponentFixture<CustomerServiceItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerServiceItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerServiceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
