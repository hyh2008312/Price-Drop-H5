import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBalanceWithdrawMoneyDialogComponent } from './account-balance-withdraw-money-dialog.component';

describe('AccountBalanceWithdrawMoneyDialogComponent', () => {
  let component: AccountBalanceWithdrawMoneyDialogComponent;
  let fixture: ComponentFixture<AccountBalanceWithdrawMoneyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountBalanceWithdrawMoneyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBalanceWithdrawMoneyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
