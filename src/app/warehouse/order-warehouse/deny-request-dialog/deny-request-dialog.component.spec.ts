import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenyRequestDialogComponent } from './deny-request-dialog.component';

describe('DenyRequestDialogComponent', () => {
  let component: DenyRequestDialogComponent;
  let fixture: ComponentFixture<DenyRequestDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenyRequestDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenyRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
