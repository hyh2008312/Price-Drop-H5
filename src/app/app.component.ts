import { Component } from '@angular/core';
import { UserService } from './shared/services/user/user.service';
import { AuthenticationService } from './shared/services/authentication/authentication.service';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./_app.component.scss']
})

export class AppComponent {
  over: any = 'over';

  title = 'PriceDrop';

  isLoadingShow = true;

  isLogin: boolean = false;

  user: any = {};

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private angulartics2GoogleTagManager: Angulartics2GoogleTagManager,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const self = this;


    window.document.addEventListener('PrebootComplete', () => {
      // put your code here that you want to run once preboot is complete
      self.isLoadingShow = false;
    });

    // 防止懒加载重定向
    self.userService.currentUser.subscribe((data) => {
      if ( data == null ) {
        self.userService.getUser().then((data) => {
          self.userService.addUser(data);
          self.user = data;
          self.isLogin = true;
        }).catch((data) => {
          self.isLogin = false;
        });
      } else {
        self.user = data;
        self.isLogin = true;
      }
    });

    self.userService.navigation.subscribe((data) => {
      if(data) {
        self.title = data;
      } else {
        self.title = 'PriceDrop';
      }
    });
  }

  jump(drawer, link?: any) {
    drawer.close();
    this.router.navigate([link]);
  }
  jumpNewPage(link?: any) {
    if (this.isLogin) {
      this.router.navigate([link]);
    } else {
      this.router.navigate(['/account/login']);
    }
  }
}
