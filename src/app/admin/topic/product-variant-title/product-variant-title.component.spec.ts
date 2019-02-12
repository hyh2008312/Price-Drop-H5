import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVariantTitleComponent } from './product-variant-title.component';

describe('ProductVariantTitleComponent', () => {
  let component: ProductVariantTitleComponent;
  let fixture: ComponentFixture<ProductVariantTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductVariantTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVariantTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
