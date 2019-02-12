import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHotwordDialogComponent } from './add-hotword-dialog.component';

describe('AddHotwordDialogComponent', () => {
  let component: AddHotwordDialogComponent;
  let fixture: ComponentFixture<AddHotwordDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHotwordDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHotwordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
