import {NgModule} from '@angular/core';
import {AboutComponent} from './about.component';
import {AboutRoutingModule} from './about.routes.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AboutRoutingModule
  ],
  declarations: [
    AboutComponent,

  ]
})
export class AboutModule {
}
