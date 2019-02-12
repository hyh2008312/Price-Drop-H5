import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTitleComponent } from './category-title.component';

describe('CategoryTitleComponent', () => {
  let component: CategoryTitleComponent;
  let fixture: ComponentFixture<CategoryTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
