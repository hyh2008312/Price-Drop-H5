import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmNotFoundDialogComponent } from './confirm-not-found-dialog.component';

describe('ConfirmNotFoundDialogComponent', () => {
  let component: ConfirmNotFoundDialogComponent;
  let fixture: ComponentFixture<ConfirmNotFoundDialogComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmNotFoundDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmNotFoundDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
