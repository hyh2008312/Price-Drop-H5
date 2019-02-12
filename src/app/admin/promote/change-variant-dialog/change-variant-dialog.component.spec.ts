import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeVariantDialogComponent } from './change-variant-dialog.component';

describe('ChangeVariantDialogComponent', () => {
  let component: ChangeVariantDialogComponent;
  let fixture: ComponentFixture<ChangeVariantDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeVariantDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeVariantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
