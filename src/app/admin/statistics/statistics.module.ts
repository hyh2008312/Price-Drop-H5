import { NgModule } from '@angular/core';

import { StatisticsMainComponent } from './statistics-main/statistics-main.component';

import { StatisticsService } from './statistics.service';

import { StatisticsRoutingModule } from './statistics.routes.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    StatisticsRoutingModule
  ],
  exports: [],
  declarations: [
    StatisticsMainComponent
  ],
  entryComponents: [],
  providers: [
    StatisticsService
  ]
})
export class OrderModule { }

