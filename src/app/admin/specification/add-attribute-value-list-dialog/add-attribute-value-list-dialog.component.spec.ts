import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttributeValueListDialogComponent } from './add-attribute-value-list-dialog.component';

describe('AddAttributeValueListDialogComponent', () => {
  let component: AddAttributeValueListDialogComponent;
  let fixture: ComponentFixture<AddAttributeValueListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAttributeValueListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttributeValueListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
