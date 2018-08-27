import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../login.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { UserService } from '../../shared/services/user/user.service';
import { GuardLinkService } from '../../shared/services/guard-link/guard-link.service';

import { AuthService } from 'angular2-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../login.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

  loginGroup: FormGroup;

  loginErr: any = false;

  token: any;

  showLoading = false;
  loadingValue: any = 0;
  color = 'Accent';

  //存储错误信息
  formErrors = {
    'username': '',
    'password': ''
  };

  //错误对应的提示
  validationMessages = {
    'username': {
      'required': 'This field is required'
    },
    'password': {
      'required': 'This field is required'
    }
  };

  facebookLoginSub: any;
  googleLoginSub: any;

  loginLink: any = false;
  loginStatus: any ;
  verifyCode: any ;
  verifyShow: any  = false;
  phoneNum: any = '';
  Vcode: any = '';
  errMsg: any = '';
  errTwo: any = false;
  second: any;
  disabled: any ;
  isF: any = true ;
  bindNum: any ;

  sub: any;

  constructor(
    private router: Router,
    private service: LoginService,
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private userService: UserService,
    public _auth: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private guardLinkService: GuardLinkService
  ) {
    this.loginGroup = this.fb.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    });

    this.loginGroup.valueChanges.subscribe(data => this.onValueChanged(data));

    this.sub = this.guardLinkService.routerLink.subscribe((data) => {
      if (data) {
        this.loginLink = data;
      }
    });
  }


  /**
   * 表单值改变时，重新校验
   * @param data
   */
  onValueChanged(data) {

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      //取到表单字段
      const control = this.loginGroup.get(field);
      //表单字段已修改或无效
      if (control && control.dirty && !control.valid) {
        //取出对应字段可能的错误信息
        const messages = this.validationMessages[field];
        //从errors里取出错误类型，再拼上该错误对应的信息
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + '';
          break;
        }
      }

    }

  }

  ngOnInit(): void {

  }

  login() {
    if (!this.loginGroup.valid) {
      return;
    }

    const self = this;
    const _setLogin = false;
    this.loadingValue = 0;
    this.showLoading = true;
    this.load();
    self.service.login(this.loginGroup.value).then((data) => {
      self.loginErr = false;
      self.auth.setAccessToken(data);
      self.userService.getUser().then((data) => {
        self.userService.addUser(data);
        self.auth.inviteToken(data.isInvite);
        if (self.loginLink) {
          self.router.navigate([self.loginLink]).then((data) => {
            self.showLoading = false;
            self.loadingValue = 0;
          });
        } else {
          window.open('https://www.getpricedrop.com/')
        }
      });
    }).catch((data) => {
      self.loginErr = data;
    });

  }

  googleLogin(provider) {
    const self = this;
    let first = false;
    this.loadingValue = 0;
    this.showLoading = true;
    this.load()
    this.googleLoginSub = this._auth.login(provider).subscribe(
      (data) => {
        if (data) {
          self.service.googleLogin(data).then((res) => {
            self.loginErr = false;
            if (res && !first) {
              first = true;

              const token = {
                access_token: res.token.accessToken,
                refresh_token: res.token.refreshToken,
                expires_in: res.token.expiresIn
              };
              self.auth.setAccessToken(token);
              self.userService.addUser(res.user);
              self.auth.inviteToken(res.user.isInvite);
              self.loginStatus = true

              if (self.loginLink) {
                self.bindNum = res.user.bindMobile
                if (self.bindNum == '' ) {
                  self.showLoading = false;
                  self.loadingValue = 0;
                  self.verifyShow = true
                } else {
                  self.router.navigate([self.loginLink]).then((data) => {
                  //   self.showLoading = false;
                  //   self.loadingValue = 0;
                  //   self.userService.addLogin(true);
                  });
                }
              } else {
                // self.router.navigate(['/drops/detail/1']).then((data) => {
                //   self.showLoading = false;
                //   self.loadingValue = 0;
                // });
              }
              self.changeDetectorRef.detectChanges();
            }
          });
        }
      }
    )
  }

  facebookLogin(provider) {
    const self = this;
    let first = false;
    this.facebookLoginSub = this._auth.login(provider).subscribe(
        (data) => {
          if (data) {
            self.service.facebookLogin(data).then((res) => {
              self.loginErr = false;
              if (res && !first) {
                first = true;

                const token = {
                  access_token: res.token.accessToken,
                  refresh_token: res.token.refreshToken,
                  expires_in: res.token.expiresIn
                };
                self.auth.setAccessToken(token);
                self.userService.addUser(res.user);
                self.auth.inviteToken(res.user.isInvite);
                if (res.user.firstLogin) {
                  self.router.navigate(['/account/signup'], {queryParams: {tab: 'settingProfile'}});
                } else {
                  if (res.user && res.user.store && res.user.store.length > 0) {
                    // self.userService.addStore(res.user.store[0]);

                    if (res.user && res.user.isInvite) {
                      self.router.navigate(['/shop/dashboard']);

                    } else {
                      self.router.navigate(['/account/invitation']);
                    }

                    self.router.navigate(['/shop/dashboard']);
                  } else {
                    self.router.navigate(['/account/signup'], {queryParams: {step: 1}});
                  }
                }
                self.changeDetectorRef.markForCheck();
                self.changeDetectorRef.detectChanges();
              }
            });
          }
        }
      )
  }

  scoller() {

    // document.body.addEventListener('click',  (event)=> {
    // //   alert(event)
    // // }
    //   let element = event.target;
    //   let tags = {
    //     'INPUT': 1,
    //     'TEXTAREA': 1,
    //   }
    //   console.log( element.scrollIntoViewIfNeeded())
    //   if ((element.tagName in tags) ) {
    //     setTimeout(()=>{
    //       element.scrollIntoViewIfNeeded();
    //       console.log('scrollIntoViewIfNeeded');
    //     }, 400);
    //   }
    //
    // }, false);
  }
  getCodeF() {
    if (this.phoneNum == '') {
      this.errMsg = 'Please enter your mobile number.'
      this.isF = false
    } else {
      this.isF = true
    }
    if (this.isF) {
      this.getCode()
      this.isF = false
    }
    this.changeDetectorRef.detectChanges();
  }
  getCode() {
    // let self = this;
    const data = {
      'mobile' : this.phoneNum
    }
    this.time()
    this.service.getCode(data, this.loginStatus).then((res) => {
      if (res.result === 'success') {
        this.errMsg = ''
      } else {
        if (res.code == 30004) {
          this.errTwo = true
        } else {
          this.errMsg = res.message
        }
      }
      // (<any>window).dataLayer.push({
      //   'event': 'VirtualPageView',
      //   'virtualPageURL': '/storesetup/url',
      //   'virtualPageTitle': 'StoreSetup - URL'
      // });
      this.changeDetectorRef.detectChanges();
    }).catch(res => {
      console.log(res)
    })

  }
  time () {
    let timer = null
    clearInterval(timer);
    let time = 60;
    timer = setInterval(() => {
      console.log(time);
      if (time < 0 ) {
        this.second = '';
        this.disabled = false;
      } else if ( time == 0) {
        this.second = 'Resend Code';
        this.disabled = false;
        this.isF = true;
        clearInterval(timer);
      } else {
        this.disabled = true;
        this.second = '';
        this.second = time + 's';
        time--;
      }
      this.changeDetectorRef.detectChanges();
    }, 1000);

  }
  // enterCodeF(){
  //
  // }

  enterCode() {
    if(this.Vcode == '') {
      this.errMsg = 'Please enter your verification code.'
      this.changeDetectorRef.detectChanges();
      return
    }
    const data = {
      'mobile' : this.phoneNum,
      'code' : this.Vcode
    }

    this.service.verifyCode(data, this.loginStatus).then((res) => {
      if(res.result =='success'){
        this.router.navigate([this.loginLink]).then((data) => {
          this.userService.addLogin(true);
        });
      } else {
        if(res.code){
          this.errMsg = res.message
        }
      }
      this.changeDetectorRef.detectChanges();
    }).catch(res => {
      console.log(res)
    })
  }

  ngOnDestroy() {
    if (this.googleLoginSub) {
      this.googleLoginSub.unsubscribe();
    }
    if (this.facebookLoginSub) {
      this.facebookLoginSub.unsubscribe();
    }
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.changeDetectorRef) {
      this.changeDetectorRef.detach();
    }
  }

  private load() {
    if (this.loadingValue < 90) {
      this.loadingValue++;
    } else {
      return;
    }

    requestAnimationFrame(() => this.load());

  }
}
