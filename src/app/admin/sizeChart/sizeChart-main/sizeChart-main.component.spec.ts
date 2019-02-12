import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeChartMainComponent } from './sizeChart-main.component';

describe('SizeChartMainComponent', () => {
  let component: SizeChartMainComponent;
  let fixture: ComponentFixture<SizeChartMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeChartMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeChartMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
