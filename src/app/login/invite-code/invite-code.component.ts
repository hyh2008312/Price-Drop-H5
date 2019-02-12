import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { UserService } from '../../shared/services/user/user.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-invite-code',
  templateUrl: './invite-code.component.html',
  styleUrls: ['../login.scss']
})

export class InviteCodeComponent implements OnInit {

  inviteForm : FormGroup;
  inviteErr : any = false;
  userId: any;
  store: any = false;

  public dialogRef: MatDialogRef<InviteCodeComponent>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.inviteForm = this.fb.group({
      inviteToken: ['', [
        Validators.required
      ]]
    });

    this.inviteForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  ngOnInit():void {
    let self = this;
    this.userService.currentUser.subscribe((data) => {
      if(data) {
        self.userId = data.id;
        if(data.store && data.store.length > 0) {
          self.store = data.store;
        }
      }


    })
  }

  //存储错误信息
  formErrors = {
    'inviteToken': ''
  };

  //错误对应的提示
  validationMessages = {
    'inviteToken': {
      'required': 'This field is required.'
    }
  };

  /**
   * 表单值改变时，重新校验
   * @param data
   */
  onValueChanged(data) {

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      //取到表单字段
      const control = this.inviteForm.get(field);
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

  validateCode() {
    if(!this.inviteForm.valid) {
      return;
    }
    let self = this;
    let option = this.inviteForm.value;
    option.userId = self.userId;
    self.loginService.validateCode(option).then((data)=> {
      self.authenticationService.inviteToken(true);
      self.close();
      if(self.store) {
        self.router.navigate(['/shop/toDoList']);
      } else {
        self.router.navigate(['/account/signup'],{ queryParams: { step: 1 } });
      }
    }).catch((data) => {
      self.inviteErr = data;
    });
  }

  close():void {
    if(this.dialogRef) {
      this.dialogRef.close();
    }
  }

}
