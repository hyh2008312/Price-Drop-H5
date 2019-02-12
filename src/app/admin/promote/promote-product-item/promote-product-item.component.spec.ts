import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductProductItemComponent } from './promote-product-item.component';

describe('ProductProductItemComponent', () => {
  let component: ProductProductItemComponent;
  let fixture: ComponentFixture<ProductProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductProductItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
