import { Component, OnDestroy, Inject, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';

import { LoginService } from '../login.service';
import { ConstantService } from  '../../shared/services/constant/constant.service';
import { AuthenticationService } from  '../../shared/services/authentication/authentication.service';
import { UserService } from '../../shared/services/user/user.service';

import { Subject } from "rxjs/Subject";

import { LoginDialogComponent } from '../login/login-dialog.component';

import { AuthService } from "angular2-social-login";
import { SystemConstant } from '../../config/app.api';

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['../login.scss']
})

export class SignUpDialogComponent {

  step: number = 0;
  isFirstLogin: boolean = false;

  token: any;
  public systemConstant: SystemConstant = new SystemConstant();

  country: string;
  currency: string;
  storeName: any;

  public countries: Object[];
  public currencies: Object[];

  signUpGroup : FormGroup;
  storeForm : FormGroup;
  settingForm: FormGroup;

  public signUpErr: any = false;
  public storeErr: any = false;
  public settingErr: any = false;

  facebookLoginSub: any;
  googleLoginSub: any;

  currentUserSub: any;
  authSub: any;

  //存储错误信息
  formErrors = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'password' : '',
    'country' : '',
    'name': '',
    'currency': '',
    'displayName' : '',
    'socialMediaLink': ''
  };

  //错误对应的提示
  validationMessages = {
    'firstName': {
      'required': 'This field is required.',
    },
    'lastName': {
      'required': 'This field is required.',
    },
    'email':{
      'required': 'This field is required.'
    },
    'password':{
      'required': 'This field is required.'
    },
    'country':{
      'required': 'Password is required.'
    },
    'name': {
      'required': 'This field is required.'
    },
    'currency': {
      'required': 'This field is required.'
    },
    'displayName': {
      'required': 'This field is required.',
      'pattern': 'Permalink only lowercase alphanumeric and "-" allowed.'
    },
    'socialMediaLink': {
      'required': 'This field is required.'
    }
  };



  constructor(
    private router : Router,
    private service: LoginService,
    private fb: FormBuilder,
    private constant: ConstantService,
    private auth: AuthenticationService,
    private routerInfo :ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog,
    public _auth: AuthService,
    public dialogRef: MatDialogRef<SignUpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private angulartics2GoogleTagManager: Angulartics2GoogleTagManager
  ) {
    this.signUpGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [
        Validators.required
      ]],
      country: ['', Validators.required],
      password: ['', [
        Validators.required
      ]]
    });

    this.storeForm = this.fb.group({
      name: ['', Validators.required],
      currency: ['', Validators.required],
      displayName: ['', [
        Validators.required,
        Validators.pattern('^[a-z0-9\.-]*$')
      ]]
    });

    this.settingForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [
        Validators.required
      ]],
      country: ['', Validators.required],
      password: ['', [
        Validators.required
      ]],
      socialMediaLink: ['', Validators.required]
    });

    this.countries = this.constant.getCountries();
    this.currencies = this.constant.getCurrencies();

    this.signUpGroup.valueChanges.subscribe(data => this.onSignUpGroupValueChanged(data));
    this.storeForm.valueChanges.subscribe(data => this.onStoreFormValueChanged(data));
    this.settingForm.valueChanges.subscribe(data => this.onSettingFormValueChanged(data));

  }

  ngOnInit() {
    let self = this;
    self.authSub = self.auth.isAuthorized().subscribe((auth) => {
      if(auth && self.data.step == 1) {
        self.step = 1;
        self.angulartics2GoogleTagManager.pageTrack('/signup/store-setup');
      }
    });
    self.currentUserSub = self.userService.currentUser.subscribe((data) => {
      if(data &&  self.data.tab == 'settingProfile') {
        self.step = 0;
        self.isFirstLogin = true;
        self.angulartics2GoogleTagManager.pageTrack('/signup/basic-info');

        let country = '';
        self.countries.find((item: any) => {
          if(item.name == data.country) {
            country = item.code;
            return true;
          } else {
            return false;
          }
        });

        self.settingForm.setValue({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          country: country,
          password: ''
        });
      }
    });
  }

  /**
   * 表单值改变时，重新校验
   * @param data
   */
  onSignUpGroupValueChanged(data) {

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      //取到表单字段
      const control = this.signUpGroup.get(field);
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

  onStoreFormValueChanged(data) {

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      //取到表单字段
      const control = this.storeForm.get(field);
      //表单字段已修改或无效
      if (control && control.dirty && !control.valid) {
        //取出对应字段可能的错误信息
        const messages = this.validationMessages[field];
        //从errors里取出错误类型，再拼上该错误对应的信息
        for(const key in control.errors) {
          this.formErrors[field] += messages[key] + '';
          break;
        }
      }

    }

  }
  onSettingFormValueChanged(data) {

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      //取到表单字段
      const control = this.settingForm.get(field);
      //表单字段已修改或无效
      if (control && control.dirty && !control.valid) {
        //取出对应字段可能的错误信息
        const messages = this.validationMessages[field];
        //从errors里取出错误类型，再拼上该错误对应的信息
        for(const key in control.errors) {
          this.formErrors[field] += messages[key] + '';
          break;
        }
      }

    }

  }

  signUp() {
    if(!this.signUpGroup.valid) {
      return;
    }

    let self = this;
    self.service.signUp(this.signUpGroup.value).then((data) => {
      self.signUpErr = false;
      let loginObject = {
        username: self.signUpGroup.value.email,
        password: self.signUpGroup.value.password
      };
      self.service.login(loginObject).then((data)=>{
        self.auth.setAccessToken(data);
        self.step = 1;
        self.angulartics2GoogleTagManager.pageTrack('/signup/store-setup');
      });
    }).catch((data) => {
      self.signUpErr = data;
    });
  }

  setting() {
    if(!this.settingForm.valid) {
      return;
    }

    let self = this;
    self.service.settingProfile(this.settingForm.value).then((data) => {
      self.settingErr = false;
      self.step = 1;
      self.angulartics2GoogleTagManager.pageTrack('/signup/store-setup');
    }).catch((data) => {
      self.settingErr = data;
    });
  }

  googleLogin(provider) {
    let self = this;
    this.googleLoginSub = this._auth.login(provider).subscribe(
      (data) => {
        if(data) {
          self.service.googleLogin(data).then((res) => {
            self.signUpErr = false;
            if(res) {
              let token = {
                access_token: res.token.accessToken,
                refresh_token: res.token.refreshToken,
                expires_in: res.token.expiresIn
              };
              self.auth.setAccessToken(token);
              self.userService.addUser(res.user);
              if(res.user.firstLogin) {
                self.isFirstLogin = res.user.firstLogin;
                self.angulartics2GoogleTagManager.pageTrack('/signup/basic-info');

                let country = '';
                self.countries.find((item: any) => {
                  if(item.name == res.user.country) {
                    country = item.code;
                    return true;
                  } else {
                    return false;
                  }
                });

                self.settingForm.setValue({
                  firstName: res.user.firstName,
                  lastName: res.user.lastName,
                  email: res.user.email,
                  country: country,
                  password: ''
                });
              } else {
                self.step = 1;
                self.angulartics2GoogleTagManager.pageTrack('/signup/store-setup');
              }
            }
          }).catch((res) => {
            self.signUpErr = res;
          });
        }
      }
    )
  }

  facebookLogin(provider) {
    let self = this;
    this.facebookLoginSub = this._auth.login(provider).subscribe(
      (data) => {
        if(data) {
          self.service.facebookLogin(data).then((res) => {
            self.signUpErr = false;
            if(res) {
              let token = {
                access_token: res.token.accessToken,
                refresh_token: res.token.refreshToken,
                expires_in: res.token.expiresIn
              };
              self.auth.setAccessToken(token);
              self.userService.addUser(res.user);
              if(res.user.firstLogin) {
                self.isFirstLogin = res.user.firstLogin;
                self.angulartics2GoogleTagManager.pageTrack('/signup/basic-info');

                let country = '';
                self.countries.find((item: any) => {
                  if(item.name == res.user.country) {
                    country = item.code;
                    return true;
                  } else {
                    return false;
                  }
                });

                self.settingForm.setValue({
                  firstName: res.user.firstName,
                  lastName: res.user.lastName,
                  email: res.user.email,
                  country: country,
                  password: ''
                });
              } else {
                self.step = 1;
                self.angulartics2GoogleTagManager.pageTrack('/signup/store-setup');
              }
            }
          }).catch((res) => {
            self.signUpErr = res;
          });
        }
      }
    )
  }

  complete() {
    if(!this.storeForm.valid) {
      return;
    }

    let self = this;
    let socialMediaLink = this.storeForm.value.socialMediaLink;

    self.service.setSocialMediaLink({
      socialMediaLink
    });

    self.service.createStore(this.storeForm.value).then((data)=>{
      self.userService.getUser().then((data) => {
        self.userService.addUser(data);
        if(data.isInvite) {
          self.close();
          self.router.navigate(['/admin']);
        } else {
          self.step = 2;
          self.angulartics2GoogleTagManager.pageTrack('/signup/complete');
        }

      });
    }).catch((data) => {
      self.storeErr = data;
    });
  }

  openLogIn(): void {
    this.close();

    let dialogRef = this.dialog.open(LoginDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  close():void {
    this.dialogRef.close();
  }

  ngOnDestroy(){
    if(this.googleLoginSub) {
      this.googleLoginSub.unsubscribe();
    }
    if(this.facebookLoginSub) {
      this.facebookLoginSub.unsubscribe();
    }
  }

}
