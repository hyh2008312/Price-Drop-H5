import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CutPriceDialogComponent } from './cut-price-dialog.component';

describe('CutPriceDialogComponent', () => {
  let component: CutPriceDialogComponent;
  let fixture: ComponentFixture<CutPriceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CutPriceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CutPriceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
