import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';
import {FaqComponent} from './faq/faq.component';
import {FaqQaComponent} from './faq-qa/faq-qa.component';
import {AboutComponent} from './about/about.component';
import {AboutTmpComponent} from './about-tmp/about-tmp.component';


const routes: Routes = [
  { path: '', component: FaqComponent },
  { path: 'tmp', component: FaqQaComponent },
  { path: 'about', component: AboutComponent },
  { path: 'about/tmp', component: AboutTmpComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FAQRoutingModule { }
