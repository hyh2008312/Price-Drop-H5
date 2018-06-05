import { Component } from '@angular/core';
import { UserService } from './shared/services/user/user.service';
import { AuthenticationService } from './shared/services/authentication/authentication.service';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'SocialCommer';

  sub: any;
  sub1: any;

  isLoadingShow: boolean = true;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private angulartics2GoogleTagManager: Angulartics2GoogleTagManager
  ) {
    let self = this;


    window.document.addEventListener('PrebootComplete', () => {
      // put your code here that you want to run once preboot is complete
      self.isLoadingShow = false;
    });

    // 防止懒加载重定向
    if(!window['userInfo']) {
      window['userInfo'] = true;
      self.userService.currentUser.subscribe((data) => {
        if( data == null ) {
          self.userService.getUser().then((data) => {
            self.userService.addUser(data);
            // self.userService.addStore(data.store[0]);
            self.authenticationService.inviteToken(data.isInvite);
          }).catch((data) => {
            self.authenticationService.inviteToken(false);
          });
        }
      });
    }
  }
}
