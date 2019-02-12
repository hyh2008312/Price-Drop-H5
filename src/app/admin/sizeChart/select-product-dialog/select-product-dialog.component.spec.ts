import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProductDialogComponent } from './select-product-dialog.component';

describe('SelectProductDialogComponent', () => {
  let component: SelectProductDialogComponent;
  let fixture: ComponentFixture<SelectProductDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectProductDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
