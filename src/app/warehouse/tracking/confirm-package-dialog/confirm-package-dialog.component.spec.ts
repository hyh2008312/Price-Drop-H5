import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPackageDialogComponent } from './confirm-package-dialog.component';

describe('ConfirmPackageDialogComponent', () => {
  let component: ConfirmPackageDialogComponent;
  let fixture: ComponentFixture<ConfirmPackageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmPackageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPackageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
