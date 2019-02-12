import {NgModule} from '@angular/core';

import {AccountRoutingModule} from './account.routes.module';
import {SharedModule} from '../../shared/shared.module';
import {AccountService} from "./account.service";
import {AccountItemComponent} from "./account-item/account-item.component";
import {AccountBalanceComponent} from "./account-balance/account-balance.component";
import {AccountMainComponent} from "./account-main/account-main.component";
import {AccountTitleComponent} from "./account-title/account-title.component";
import {AccountSettingComponent} from "./account-setting/account-setting.component";
import {AccountBalanceWithdrawMoneyDialogComponent} from "./account-balance-withdraw-money-dialog/account-balance-withdraw-money-dialog.component";
import {AccountPaymentSettingComponent} from "./account-payment-setting/account-payment-setting.component";
import {ToolTipsComponent} from "./tool-tips/tool-tips.component";

@NgModule({
  imports: [
    SharedModule,
    AccountRoutingModule
  ],
  exports: [],
  declarations: [
    AccountItemComponent,
    AccountBalanceComponent,
    AccountMainComponent,
    AccountTitleComponent,
    AccountBalanceWithdrawMoneyDialogComponent,
    AccountPaymentSettingComponent,
    AccountSettingComponent,
    ToolTipsComponent
  ],
  entryComponents: [
    AccountBalanceWithdrawMoneyDialogComponent,
    ToolTipsComponent
  ],
  providers: [AccountService]
})
export class AccountModule {
}

