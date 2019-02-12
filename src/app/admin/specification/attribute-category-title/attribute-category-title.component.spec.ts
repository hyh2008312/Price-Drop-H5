import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeCategoryTitleComponent } from './attribute-category-title.component';

describe('AttributeCategoryTitleComponent', () => {
  let component: AttributeCategoryTitleComponent;
  let fixture: ComponentFixture<AttributeCategoryTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeCategoryTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeCategoryTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
