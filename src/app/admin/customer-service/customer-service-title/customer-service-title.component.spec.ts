import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceTitleComponent } from './customer-service-title.component';

describe('CustomerServiceTitleComponent', () => {
  let component: CustomerServiceTitleComponent;
  let fixture: ComponentFixture<CustomerServiceTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerServiceTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerServiceTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
