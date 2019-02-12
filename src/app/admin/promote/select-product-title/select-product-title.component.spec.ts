import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProductTitleComponent } from './select-product-title.component';

describe('SelectProductTitleComponent', () => {
  let component: SelectProductTitleComponent;
  let fixture: ComponentFixture<SelectProductTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectProductTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProductTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
