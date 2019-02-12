import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProductItemComponent } from './select-product-item.component';

describe('SelectProductItemComponent', () => {
  let component: SelectProductItemComponent;
  let fixture: ComponentFixture<SelectProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectProductItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
