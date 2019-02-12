import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceMainComponent } from './customer-service-main.component';

describe('CustomerServiceMainComponent', () => {
  let component: CustomerServiceMainComponent;
  let fixture: ComponentFixture<CustomerServiceMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerServiceMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerServiceMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
