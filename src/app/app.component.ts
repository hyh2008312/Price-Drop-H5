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

  title: any;

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


    window.document.addEventListener('PrebootComplete', () => {
      // put your code here that you want to run once preboot is complete
      this.isLoadingShow = false;
    });

    // 防止懒加载重定向
    this.userService.currentUser.subscribe((data) => {
      if ( data == null ) {
        this.userService.getUser().then((data) => {
          this.userService.addUser(data);
          this.user = data;
          this.isLogin = true;
        }).catch((data) => {
          this.isLogin = false;
        });
      } else {
        this.user = data;
        this.isLogin = true;
      }
    });

    this.userService.navigation.subscribe((data) => {
      if(data) {
        this.title = data;
      } else {
        this.title = 'PriceDrop';
      }
    });
  }

  jump(drawer, link?: any) {
    this.router.navigate([link]).then(() => {
      drawer.close();
    });
  }

  logout(drawer) {
    drawer.close();
    this.authenticationService.logout();
    this.router.navigate(['/'], {replaceUrl: true});
  }
}
