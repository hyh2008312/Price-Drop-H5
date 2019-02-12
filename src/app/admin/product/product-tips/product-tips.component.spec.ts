import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTipsComponent } from './product-tips.component';

describe('ProductTipsComponent', () => {
  let component: ProductTipsComponent;
  let fixture: ComponentFixture<ProductTipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
