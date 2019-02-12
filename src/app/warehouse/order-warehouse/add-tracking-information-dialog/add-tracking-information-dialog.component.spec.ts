import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrackingInformationDialogComponent } from './add-tracking-information-dialog.component';

describe('AddTrackingInformationDialogComponent', () => {
  let component: AddTrackingInformationDialogComponent;
  let fixture: ComponentFixture<AddTrackingInformationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTrackingInformationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrackingInformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
