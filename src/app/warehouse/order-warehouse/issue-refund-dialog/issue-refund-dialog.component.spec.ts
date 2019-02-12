import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueRefundDialogComponent } from './issue-refund-dialog.component';

describe('IssueRefundDialogComponent', () => {
  let component: IssueRefundDialogComponent;
  let fixture: ComponentFixture<IssueRefundDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueRefundDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueRefundDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
