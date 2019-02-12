import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KeywordsMainComponent} from "./keywords-main/keywords-main.component";
import {KeywordsDetailComponent} from "./keywords-detail/keywords-detail.component";

const routes: Routes = [
  {
    path: '', component: KeywordsMainComponent
  },
  {
    path: 'detail/:id', component: KeywordsDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeywordsRoutingModule {
}
