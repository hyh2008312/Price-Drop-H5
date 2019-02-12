import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMainComponent } from './statistics-main.component';

describe('OrderMainComponent', () => {
  let component: OrderMainComponent;
  let fixture: ComponentFixture<OrderMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
