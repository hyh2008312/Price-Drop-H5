import { NgModule } from '@angular/core';

import { MembershipMainComponent } from './membership-main/membership-main.component';
import { MembershipCreateComponent } from './membership-create/membership-create.component';
import { MembershipEditComponent } from './membership-edit/membership-edit.component';
import { MembershipDetailComponent } from './membership-detail/membership-detail.component';
import { ImageUploadAdditionalComponent } from './image-upload-additional/image-upload-additional.component';
import { MembershipTitleComponent } from './membership-title/membership-title.component';
import { MembershipItemComponent } from './membership-item/membership-item.component';
import { MembershipItemTitleComponent } from './membership-item-title/membership-item-title.component';
import { MembershipItemItemComponent } from './membership-item-item/membership-item-item.component';
import { ToolTipsComponent } from './tool-tips/tool-tips.component';

import { MembershipRoutingModule } from './membership.routes.module';
import { SharedModule } from '../../shared/shared.module';

import { MembershipService } from './membership.service';

@NgModule({
  imports: [
    SharedModule,
    MembershipRoutingModule
  ],
  exports: [],
  declarations: [
    MembershipMainComponent,
    MembershipCreateComponent,
    MembershipEditComponent,
    MembershipDetailComponent,
    ImageUploadAdditionalComponent,
    MembershipTitleComponent,
    MembershipItemComponent,
    ToolTipsComponent,
    MembershipItemTitleComponent,
    MembershipItemItemComponent
  ],
  entryComponents: [
    ToolTipsComponent
  ],
  providers: [
    MembershipService
  ]
})
export class MembershipModule { }

