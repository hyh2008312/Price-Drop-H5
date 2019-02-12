import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeChartItemComponent } from './sizeChart-item.component';

describe('SizeChartItemComponent', () => {
  let component: SizeChartItemComponent;
  let fixture: ComponentFixture<SizeChartItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeChartItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeChartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
