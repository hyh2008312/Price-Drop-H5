import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNotesDialogComponent } from './add-notes-dialog.component';

describe('AddNotesDialogComponent', () => {
  let component: AddNotesDialogComponent;
  let fixture: ComponentFixture<AddNotesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNotesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNotesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
