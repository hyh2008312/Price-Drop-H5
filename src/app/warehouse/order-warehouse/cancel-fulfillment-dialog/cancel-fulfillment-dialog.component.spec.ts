import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelFulfillmentDialogComponent } from './cancel-fulfillment-dialog.component';

describe('CancelFulfillmentDialogComponent', () => {
  let component: CancelFulfillmentDialogComponent;
  let fixture: ComponentFixture<CancelFulfillmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelFulfillmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelFulfillmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
