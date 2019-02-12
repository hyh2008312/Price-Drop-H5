import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryAttributeValueListDialogComponent } from './add-category-attribute-value-list-dialog.component';

describe('AddCategoryAttributeValueListDialogComponent', () => {
  let component: AddCategoryAttributeValueListDialogComponent;
  let fixture: ComponentFixture<AddCategoryAttributeValueListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCategoryAttributeValueListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryAttributeValueListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
