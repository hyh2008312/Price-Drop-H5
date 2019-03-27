import { NgModule } from '@angular/core';

import { GoodsDetailComponent} from './goods-detail/goods-detail.component';
import { DecReturnComponent} from './dec-return/dec-return.component';
import { SizeColorComponent} from './size-color/size-color.component';
import { RecommendGoodsComponent} from './recommend-goods/recommend-goods.component';
import { GoodsDetailRoutingModule } from './goods-detail.routes.module';
import { SharedModule } from '../shared/shared.module';

import { GoodsDetailService } from './goods-detail.service';
import { GoodsVariantDialogComponent } from './variant-dialog/goods-variant-dialog.component';
import { RewardPointsDialogComponent } from './reward-points-dialog/reward-points-dialog.component';
import { ShipCostDialogComponent } from './ship-cost-dialog/ship-cost-dialog.component';

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
    RecommendGoodsComponent,
    GoodsVariantDialogComponent,
    RewardPointsDialogComponent,
    ShipCostDialogComponent
  ],
  entryComponents: [
    GoodsDetailComponent,
    DecReturnComponent,
    SizeColorComponent,
    RecommendGoodsComponent,
    GoodsVariantDialogComponent,
    RewardPointsDialogComponent,
    ShipCostDialogComponent
  ],
  providers: [GoodsDetailService]
})
export class GoodsDetailModule { }

