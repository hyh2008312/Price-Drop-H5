import { NgModule } from '@angular/core';

import { GoodsDetailComponent} from './goods-detail/goods-detail.component';
import { DecReturnComponent} from './dec-return/dec-return.component';
import { SizeColorComponent} from './size-color/size-color.component';
import { RecommendGoodsComponent} from './recommend-goods/recommend-goods.component';
import { GoodsDetailRoutingModule } from './goods-detail.routes.module';
import { SharedModule } from '../shared/shared.module';

import { GoodsDetailService } from './goods-detail.service';
import {LandingPageComponent} from '../landing-page/landing-page/landing-page.component';

@NgModule({
  imports: [
    SharedModule,
    GoodsDetailRoutingModule
  ],
  exports: [],
  declarations: [
    GoodsDetailComponent,
    DecReturnComponent,
    SizeColorComponent,
    RecommendGoodsComponent
  ],
  entryComponents: [
    GoodsDetailComponent,
    DecReturnComponent,
    SizeColorComponent,
    RecommendGoodsComponent
  ],
  providers: [GoodsDetailService]
})
export class GoodsDetailModule { }

