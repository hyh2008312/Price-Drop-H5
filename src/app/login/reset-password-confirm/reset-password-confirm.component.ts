import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-reset-password-confirm',
  templateUrl: './reset-password-confirm.component.html',
  styleUrls: ['../login.scss']
})

export class ResetPasswordConfirmComponent implements OnInit {

  resetForm : FormGroup;
  resetErr : any = false;
  email: string = '';

  public dialogRef: MatDialogRef<ResetPasswordConfirmComponent>;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });

    this.resetForm.valueChanges.subscribe(data => this.onValueChanged(data));

  }

  ngOnInit():void {
    let uid = this.activatedRoute.snapshot.params['uid'];
    let token = this.activatedRoute.snapshot.params['token'];

    let self = this;
    this.loginService.getResetPasswordConfirm({uid,token}).then((data)=> {
      self.email = data.email;
    });
  }

  //存储错误信息
  formErrors = {
    'password': '',
    'confirmPassword': ''
  };

  //错误对应的提示
  validationMessages = {
    'password': {
      'required': 'This field is required.',
      'minlength': 'Password must contain at least 6 characters.'
    },
    'confirmPassword':{
      'required': 'This field is required.',
      'minlength': 'ConfirmPassword must contain at least 6 characters.',
      'validateEqual': 'Password does not match the Confirm Password.'
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
      const control = this.resetForm.get(field);
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

  resetPassword() {
    if(!this.resetForm.valid) {
      return;
    }
    let self = this;

    let password = this.resetForm.value.password;
    let uid = this.activatedRoute.snapshot.params['uid'];
    let token = this.activatedRoute.snapshot.params['token'];
    if(uid == null || token == null) {
      this.resetErr = 'Invalid link';
      return;
    }
    this.loginService.resetPasswordConfirm({
      password, uid, token
    }).then((data) => {
      self.close();
      self.router.navigate(['/account/login']);
    });
  }

  close():void {
    if(this.dialogRef) {
      this.dialogRef.close();
    }
  }

}
