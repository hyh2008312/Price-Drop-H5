import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShippingDialogComponent } from './add-shipping-dialog.component';

describe('AddShippingDialogComponent', () => {
  let component: AddShippingDialogComponent;
  let fixture: ComponentFixture<AddShippingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShippingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShippingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
