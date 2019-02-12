import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeChartTitleComponent } from './sizeChart-title.component';

describe('SizeChartTitleComponent', () => {
  let component: SizeChartTitleComponent;
  let fixture: ComponentFixture<SizeChartTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeChartTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeChartTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
