import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingProductDialogComponent } from './pending-product-dialog.component';

describe('PendingProductDialogComponent', () => {
  let component: PendingProductDialogComponent;
  let fixture: ComponentFixture<PendingProductDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingProductDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
