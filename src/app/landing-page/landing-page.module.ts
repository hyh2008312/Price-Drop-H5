import { NgModule } from '@angular/core';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FlashSaleComponent } from './flash-sale/flash-sale.component';
import { CommodityComponent } from './commodity/commodity.component';

import { LandingPageRoutingModule } from './landing-page.routes.module';
import { SharedModule } from '../shared/shared.module';

import { LandingPageService } from './landing-page.service';
import { FeaturedComponent } from './featured/featured.component';

@NgModule({
  imports: [
    SharedModule,
    LandingPageRoutingModule
  ],
  exports: [],
  declarations: [
    LandingPageComponent,
    FlashSaleComponent,
    CommodityComponent,
    FeaturedComponent
  ],
  entryComponents: [],
  providers: [LandingPageService]
})
export class LandingPageModule { }

