import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVariantItemComponent } from './product-variant-item.component';

describe('ProductVariantItemComponent', () => {
  let component: ProductVariantItemComponent;
  let fixture: ComponentFixture<ProductVariantItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductVariantItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVariantItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
