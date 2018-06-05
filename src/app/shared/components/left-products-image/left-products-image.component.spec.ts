import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftProductsImageComponent } from './left-products-image.component';

describe('LeftProductsImageComponent', () => {
  let component: LeftProductsImageComponent;
  let fixture: ComponentFixture<LeftProductsImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftProductsImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftProductsImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
