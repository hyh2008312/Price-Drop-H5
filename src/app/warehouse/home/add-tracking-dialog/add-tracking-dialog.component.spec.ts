import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrackingDialogComponent } from './add-tracking-dialog.component';

describe('AddTrackingDialogComponent', () => {
  let component: AddTrackingDialogComponent;
  let fixture: ComponentFixture<AddTrackingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTrackingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrackingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
