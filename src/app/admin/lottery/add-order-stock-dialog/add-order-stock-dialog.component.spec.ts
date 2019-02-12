import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderStockDialogComponent } from './add-order-stock-dialog.component';

describe('AddOrderStockDialogComponent', () => {
  let component: AddOrderStockDialogComponent;
  let fixture: ComponentFixture<AddOrderStockDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrderStockDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrderStockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
