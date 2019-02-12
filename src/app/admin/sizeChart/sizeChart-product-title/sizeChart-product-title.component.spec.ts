import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeChartProductTitleComponent } from './sizeChart-product-title.component';

describe('SizeChartProductTitleComponent', () => {
  let component: SizeChartProductTitleComponent;
  let fixture: ComponentFixture<SizeChartProductTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeChartProductTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeChartProductTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
