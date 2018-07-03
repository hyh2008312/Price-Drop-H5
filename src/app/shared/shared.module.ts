import { NgModule, ModuleWithProviders}            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule }    from '@angular/flex-layout';
import { MomentModule }        from 'angular2-moment';

import { SafeHtmlPipe }         from './pipes/safe-html/safe-html.pipe';

import { S3UploaderService } from './services/s3-upload/s3-upload.service';
import { PlatformService } from './services/platform/platform.service';
import { LoadingComponent } from './components/loading/loading.component';


import { QuillEditorModule } from 'ngx-quill-editor';
import { AngularCropperjsModule } from 'angular-cropperjs';

import { Angular2SocialLoginModule } from "angular2-social-login";

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
  MatProgressBarModule,
  MatProgressSpinnerModule
} from '@angular/material';


import { GoogleClientId, FacebookClientId } from '../config/app.api';

import { ClipboardModule } from 'ngx-clipboard';

import { SwiperModule } from 'ngx-swiper-wrapper';

let providers = {
  "google": {
    "clientId": GoogleClientId
  },
  "facebook": {
    "clientId": FacebookClientId,
    "apiVersion": "v3.10"
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
    MatProgressBarModule,
    MatProgressSpinnerModule,
    ClipboardModule,
    SwiperModule
  ],
  declarations: [
    SafeHtmlPipe,
    LoadingComponent,

  ],
  exports: [
    SafeHtmlPipe,
    CommonModule,
    LoadingComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    QuillEditorModule,
    AngularCropperjsModule,
    MomentModule,
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
    MatProgressBarModule,
    MatProgressSpinnerModule,
    ClipboardModule,
    SwiperModule
  ],
  providers: [
    S3UploaderService,
    PlatformService
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: SharedModule };
  }
}
Angular2SocialLoginModule.loadProvidersScripts(providers);
