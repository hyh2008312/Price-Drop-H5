import { NgModule, ModuleWithProviders }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule }    from '@angular/flex-layout';
import { MomentModule }        from 'angular2-moment';
import { MomentTimezoneModule } from 'angular-moment-timezone';

import { SafeHtmlPipe }         from './pipes/safe-html/safe-html.pipe';
import { SafeUrlPipe }         from './pipes/safe-url/safe-url.pipe';
import { SaleDiscountPipe }         from './pipes/sale-discount/sale-discount.pipe';
import { FormatCurrencyPipe }         from './pipes/format-currency/format-currency.pipe';

import { ViewResizeDirective }  from './directives/view-resize/view-resize.directive';
import { ViewScrollDirective }  from './directives/view-srcoll/view-scroll.directive';
import { ViewObjectScrollDirective }  from './directives/view-object-srcoll/view-object-scroll.directive';
import { RepeatOrderDirective }  from './directives/repeat-order/repeat-order.directive';
import { SocialShareDirective }  from './directives/social-share/social-share.directive';
import { ValidateEqualDirective }  from './directives/validate-equal/validate-equal.directive';
import { ViewScrollTopDirective }  from './directives/view-scroll-top/view-scroll-top.directive';

import { ImageUploadPreviewComponent } from './components/image-upload-preview/image-upload-preview.component';
import { ImageUploadPreviewMultiComponent } from './components/image-upload-preview-multi/image-upload-preview-multi.component';
import { ImagePreviewMultiComponent } from './components/image-preview-multi/image-preview-multi.component';
import { ImageUploadHeaderComponent } from './components/image-upload-header/image-upload-header.component';
import { ImagePreviewLoadingComponent } from './components/image-preview-loading/image-preview-loading.component';
import { LeftProductsImageComponent } from './components/left-products-image/left-products-image.component';
import { NavigationHeaderComponent } from './components/navigation-header/navigation-header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CountDownComponent } from './components/count-down/count-down.component';
import { ToastComponent } from './components/toast/toast.component';

import { ImageUploadPreviewService } from './components/image-upload-preview/image-upload-preview.service';
import { ConstantService } from './services/constant/constant.service';
import { S3UploaderService } from './services/s3-upload/s3-upload.service';

import { QuillEditorModule } from 'ngx-quill-editor';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { CarouselModule } from './components/angular4-carousel/index';
import { ClipboardModule } from 'ngx-clipboard';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { NgxEchartsModule } from 'ngx-echarts';

import { LoginService } from '../login/login.service';

import { Angular2SocialLoginModule } from 'angular2-social-login';

import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatTabsModule,
  MatDialogModule,
  MatChipsModule,
  MatIconModule,
  MatSortModule,
  MatRadioModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatDatepickerModule,
  MatProgressSpinnerModule,
  MatProgressBarModule
} from '@angular/material';

import { GoogleClientId, FacebookClientId } from '../config/app.api';

const providers = {
  'google': {
    'clientId': GoogleClientId
  },
  'facebook': {
    'clientId': FacebookClientId,
    'apiVersion': 'v2.10'
  }
};

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    QuillEditorModule,
    AngularCropperjsModule,
    CarouselModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTabsModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSnackBarModule,
    Angular2SocialLoginModule,
    MatSidenavModule,
    MatDatepickerModule,
    ClipboardModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    NgxEchartsModule,
    MatSidenavModule,
    InfiniteScrollModule
  ],
  declarations: [
    SafeHtmlPipe,
    SaleDiscountPipe,
    SafeUrlPipe,
    FormatCurrencyPipe,
    ViewResizeDirective,
    ViewScrollDirective,
    ViewObjectScrollDirective,
    RepeatOrderDirective,
    SocialShareDirective,
    ValidateEqualDirective,
    ViewScrollTopDirective,
    ImageUploadPreviewComponent,
    ImageUploadPreviewMultiComponent,
    ImagePreviewMultiComponent,
    ImageUploadHeaderComponent,
    ImagePreviewLoadingComponent,
    LeftProductsImageComponent,
    NavigationHeaderComponent,
    LoadingComponent,
    CountDownComponent,
    ToastComponent
  ],
  exports: [
    SafeHtmlPipe,
    SaleDiscountPipe,
    SafeUrlPipe,
    FormatCurrencyPipe,
    ViewResizeDirective,
    ViewScrollDirective,
    ViewObjectScrollDirective,
    RepeatOrderDirective,
    SocialShareDirective,
    ValidateEqualDirective,
    ViewScrollTopDirective,
    ImageUploadPreviewComponent,
    ImageUploadPreviewMultiComponent,
    ImagePreviewMultiComponent,
    ImageUploadHeaderComponent,
    ImagePreviewLoadingComponent,
    LeftProductsImageComponent,
    NavigationHeaderComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    QuillEditorModule,
    AngularCropperjsModule,
    MomentModule,
    MomentTimezoneModule,
    CarouselModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTabsModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatSortModule,
    MatRadioModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDatepickerModule,
    ClipboardModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    NgxEchartsModule,
    LoadingComponent,
    CountDownComponent,
    ToastComponent,
    MatSidenavModule,
    InfiniteScrollModule
  ],
  providers: [
    ImageUploadPreviewService,
    ConstantService,
    S3UploaderService,
    LoginService
  ],
  entryComponents: [
    ToastComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: SharedModule };
  }
}
Angular2SocialLoginModule.loadProvidersScripts(providers);
