import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttributeDialogComponent } from './add-category-dialog.component';

describe('AddAttributeDialogComponent', () => {
  let component: AddAttributeDialogComponent;
  let fixture: ComponentFixture<AddAttributeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAttributeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttributeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
