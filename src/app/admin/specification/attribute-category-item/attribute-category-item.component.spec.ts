import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeCategoryItemComponent } from './attribute-category-item.component';

describe('AttributeCategoryItemComponent', () => {
  let component: AttributeCategoryItemComponent;
  let fixture: ComponentFixture<AttributeCategoryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeCategoryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeCategoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
