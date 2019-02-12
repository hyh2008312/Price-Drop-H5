import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryMainComponent } from './category-main.component';

describe('CategoryMainComponent', () => {
  let component: CategoryMainComponent;
  let fixture: ComponentFixture<CategoryMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
