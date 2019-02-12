import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMultiProductDialogComponent } from './select-multi-product-dialog.component';

describe('SelectMultiProductDialogComponent', () => {
  let component: SelectMultiProductDialogComponent;
  let fixture: ComponentFixture<SelectMultiProductDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMultiProductDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMultiProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
