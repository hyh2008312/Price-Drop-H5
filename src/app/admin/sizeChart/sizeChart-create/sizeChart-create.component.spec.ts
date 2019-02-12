import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeChartCreateComponent } from './sizeChart-create.component';

describe('SizeChartCreateComponent', () => {
  let component: SizeChartCreateComponent;
  let fixture: ComponentFixture<SizeChartCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeChartCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeChartCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
