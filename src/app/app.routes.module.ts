import { RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'account',
        loadChildren: './login/login.module#LoginModule'
      }, {
        path: '',
        loadChildren: './landing-page/landing-page.module#LandingPageModule'
      }, {
        path: 'drops',
        loadChildren: './drops/drops.module#DropsModule'
      }, {
        path: 'category',
        loadChildren: './category/category.module#CategoryModule'
      }, {
        path: 'goodsdetail',
        loadChildren: './goods-detail/goods-detail.module#FAQModule'
      }, {
        path: 'order',
        loadChildren: './order/order-list.module#OrderListModule'
      }, {
        path: 'FAQ',
        loadChildren: './FAQ/FAQ.module#FAQModule'
      }
    ]
  }
];

// must use {initialNavigation: 'enabled'}) - for one load page, without reload
export const AppRoutes = RouterModule.forRoot(routes, { initialNavigation: 'enabled' });
