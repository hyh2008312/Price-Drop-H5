import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGatiPostDialogComponent } from './add-gati-post-dialog.component';

describe('AddGatiPostDialogComponent', () => {
  let component: AddGatiPostDialogComponent;
  let fixture: ComponentFixture<AddGatiPostDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGatiPostDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGatiPostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
