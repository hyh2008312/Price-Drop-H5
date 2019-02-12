import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryAttributeDialogComponent } from './add-category-attribute-dialog.component';

describe('AddCategoryAttributeDialogComponent', () => {
  let component: AddCategoryAttributeDialogComponent;
  let fixture: ComponentFixture<AddCategoryAttributeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCategoryAttributeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryAttributeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
