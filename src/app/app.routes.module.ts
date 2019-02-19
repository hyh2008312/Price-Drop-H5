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
      }, {
        path: 'admin',
        canActivate: [ ProtectedGuard ],
        loadChildren: './admin/admin.module#AdminModule'
      }, {
        path: 'warehouse',
        canActivate: [ ProtectedGuard ],
        loadChildren: './warehouse/warehouse.module#WarehouseModule'
      }, {
        path: '',
        loadChildren: './landing-page/landing-page.module#LandingPageModule'
      }, {
        path: 'about',
        loadChildren: './about/about.module#AboutModule'
      }, {
        path: 'drops',
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
