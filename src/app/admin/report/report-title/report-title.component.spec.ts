import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTitleComponent } from './report-title.component';

describe('ReportTitleComponent', () => {
  let component: ReportTitleComponent;
  let fixture: ComponentFixture<ReportTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
