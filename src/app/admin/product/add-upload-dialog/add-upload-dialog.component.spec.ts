import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUploadDialogComponent } from './add-upload-dialog.component';

describe('AddUploadDialogComponent', () => {
  let component: AddUploadDialogComponent;
  let fixture: ComponentFixture<AddUploadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUploadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
