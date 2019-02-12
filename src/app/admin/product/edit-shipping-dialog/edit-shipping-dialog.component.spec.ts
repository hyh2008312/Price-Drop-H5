import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShippingDialogComponent } from './edit-shipping-dialog.component';

describe('EditShippingDialogComponent', () => {
  let component: EditShippingDialogComponent;
  let fixture: ComponentFixture<EditShippingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditShippingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShippingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
