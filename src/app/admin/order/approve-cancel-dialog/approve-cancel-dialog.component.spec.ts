import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCancelDialogComponent } from './approve-cancel-dialog.component';

describe('ApproveCancelDialogComponent', () => {
  let component: ApproveCancelDialogComponent;
  let fixture: ComponentFixture<ApproveCancelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveCancelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCancelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
