import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipExchangeItemDialogComponent } from './ship-exchange-item-dialog.component';

describe('ShipExchangeItemDialogComponent', () => {
  let component: ShipExchangeItemDialogComponent;
  let fixture: ComponentFixture<ShipExchangeItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipExchangeItemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipExchangeItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
