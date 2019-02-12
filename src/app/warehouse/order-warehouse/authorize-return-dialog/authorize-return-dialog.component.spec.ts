import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeReturnDialogComponent } from './authorize-return-dialog.component';

describe('AuthorizeReturnDialogComponent', () => {
  let component: AuthorizeReturnDialogComponent;
  let fixture: ComponentFixture<AuthorizeReturnDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizeReturnDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizeReturnDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
