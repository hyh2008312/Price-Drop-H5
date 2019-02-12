import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListDialogComponent } from './category-list-dialog.component';

describe('CategoryListDialogComponent', () => {
  let component: CategoryListDialogComponent;
  let fixture: ComponentFixture<CategoryListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
