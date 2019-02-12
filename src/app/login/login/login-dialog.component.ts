import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoginService } from '../login.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { UserService } from '../../shared/services/user/user.service';

import { SignUpDialogComponent } from '../sign-up/sign-up-dialog.component';
import { ResetPasswordComponent } from "../reset-password/reset-password.component";
import { InviteCodeComponent } from "../invite-code/invite-code.component";

import { AuthService } from "angular2-social-login";
import { SystemConstant } from '../../config/app.api';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['../login.scss']
})

export class LoginDialogComponent implements OnInit {

  loginGroup : FormGroup;

  loginErr : any = false;

  token: any;

  step: number = 0;
  tab: string = '';

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
    'password':{
      'required': 'This field is required'
    }
  };

  facebookLoginSub: any;
  googleLoginSub: any;

  constructor(
    private router: Router,
    private service: LoginService,
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private userService: UserService,
    private dialog: MatDialog,
    public _auth: AuthService,
    public dialogRef: MatDialogRef<LoginDialogComponent>
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

  ngOnInit():void {

  }

  login() {
    if(!this.loginGroup.valid) {
      return;
    }

    let self = this;
    let _setLogin = false;
    self.service.login(this.loginGroup.value).then((data) => {
      self.loginErr = false;
      self.auth.setAccessToken(data);
      self.userService.getUser().then((data) => {
        self.userService.addUser(data);
        self.auth.inviteToken(data.isInvite);
        if(data && data.store && data.store.length>0) {

          if(data && data.isInvite) {
            self.close();
            self.router.navigate(['/admin']);
          } else {
            self.close();
            self.openInviteCode();
          }
        } else {
          self.step = 1;
          self.close();
          self.openSignUp();
        }

      });
    }).catch((data) => {
      self.loginErr = data;
    });

  }

  googleLogin(provider) {
    let self = this;
    let first = false;
    this.googleLoginSub = this._auth.login(provider).subscribe(
      (data) => {
        if(data) {
          self.service.googleLogin(data).then((res) => {
            self.loginErr = false;
            if(res && !first) {
              first = true;

              let token = {
                access_token: res.token.accessToken,
                refresh_token: res.token.refreshToken,
                expires_in: res.token.expiresIn
              };
              self.auth.setAccessToken(token);
              self.userService.addUser(res.user);
              self.auth.inviteToken(res.user.isInvite);
              if(res.user.firstLogin) {
                self.close();
                self.tab = 'settingProfile';
                self.openSignUp();
              } else {
                if(res.user && res.user.store && res.user.store.length>0) {

                  if(res.user && res.user.isInvite) {
                    self.close();
                    self.router.navigate(['/admin']);
                  } else {
                    self.close();
                    self.openInviteCode();
                  }
                } else {
                  self.step = 1;
                  self.close();
                  self.openSignUp();
                }
              }
            }
          });
        }
      }
    )
  }

  facebookLogin(provider) {
    let self = this;
    let first = false;
    this.facebookLoginSub = this._auth.login(provider).subscribe(
        (data) => {
          if(data) {
            self.service.facebookLogin(data).then((res) => {
              self.loginErr = false;
              if(res && !first) {
                first = true;

                let token = {
                  access_token: res.token.accessToken,
                  refresh_token: res.token.refreshToken,
                  expires_in: res.token.expiresIn
                };
                self.auth.setAccessToken(token);
                self.userService.addUser(res.user);
                self.auth.inviteToken(res.user.isInvite);
                if(res.user.firstLogin) {
                  self.tab = 'settingProfile';
                  self.openSignUp();
                } else {
                  if(res.user && res.user.store && res.user.store.length>0) {
                    if(res.user && res.user.isInvite) {
                      self.close();
                      self.router.navigate(['/admin']);
                    } else {
                      self.close();
                      self.openInviteCode();
                    }
                  } else {
                    self.step = 1;
                    self.close();
                    self.openSignUp();
                  }
                }
              }
            });
          }
        }
      )
  }

  openSignUp(): void {
    this.close();

    let dialogRef = this.dialog.open(SignUpDialogComponent, {
      data: {
        step: this.step,
        tab: this.tab
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openResetPassword(): void {
    this.close();

    let dialogRef = this.dialog.open(ResetPasswordComponent, {
      data: {}
    });

    dialogRef.componentInstance.dialogRef = dialogRef;

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openInviteCode(): void {
    this.close();

    let dialogRef = this.dialog.open(InviteCodeComponent, {
      data: {}
    });

    dialogRef.componentInstance.dialogRef = dialogRef;

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  close():void {
    this.dialogRef.close();
  }

  ngOnDestroy(){
    this.close();
    if(this.googleLoginSub) {
      this.googleLoginSub.unsubscribe();
    }
    if(this.facebookLoginSub) {
      this.facebookLoginSub.unsubscribe();
    }
  }
}
