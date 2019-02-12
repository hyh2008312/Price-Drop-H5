import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeChartProductItemComponent } from './sizeChart-product-item.component';

describe('SizeChartProductItemComponent', () => {
  let component: SizeChartProductItemComponent;
  let fixture: ComponentFixture<SizeChartProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeChartProductItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeChartProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
