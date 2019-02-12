import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderOutStockDialogComponent } from './add-order-out-stock-dialog.component';

describe('AddOrderOutStockDialogComponent', () => {
  let component: AddOrderOutStockDialogComponent;
  let fixture: ComponentFixture<AddOrderOutStockDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrderOutStockDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrderOutStockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
