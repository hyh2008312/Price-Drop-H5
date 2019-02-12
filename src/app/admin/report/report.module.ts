import {NgModule} from '@angular/core';

import {ReportMainComponent} from './report-main/report-main.component';
import {ReportRoutingModule} from './report.routes.module';
import {SharedModule} from '../../shared/shared.module';
import {ReportTitleComponent} from "./report-title/report-title.component";
import {ReportItemComponent} from "./report-item/report-item.component";
import {ReportService} from "./report.service";

@NgModule({
  imports: [
    SharedModule,
    ReportRoutingModule
  ],
  exports: [],
  declarations: [
    ReportMainComponent,
    ReportTitleComponent,
    ReportItemComponent,
  ],
  entryComponents: [],
  providers: [ReportService]
})
export class ReportModule {
}

