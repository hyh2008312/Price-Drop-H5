import { RouterModule, Routes} from '@angular/router';
import { ProtectedGuard } from 'ngx-auth';

import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'account',
        loadChildren: './login/login.module#LoginModule'
      },{
        path: '',
        loadChildren: './drops/drops.module#DropsModule'
      }
    ]
  }, {
    path: '**',
    redirectTo: ''
  }
];

// must use {initialNavigation: 'enabled'}) - for one load page, without reload
export const AppRoutes = RouterModule.forRoot(routes, { initialNavigation: 'enabled' });
