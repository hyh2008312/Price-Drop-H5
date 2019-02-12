import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../login.scss']
})

export class ResetPasswordComponent implements OnInit {

  resetForm : FormGroup;
  resetErr : any = false;
  step: number = 0;
  email: string = '';

  public dialogRef: MatDialogRef<ResetPasswordComponent>;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    this.resetForm = this.fb.group({
      email: ['', [
        Validators.required
      ]]
    });

    this.resetForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  ngOnInit():void {
  }

  //存储错误信息
  formErrors = {
    'email': ''
  };

  //错误对应的提示
  validationMessages = {
    'email': {
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
    this.loginService.resetPassword(this.resetForm.value).then((data)=> {
      self.step = 1;
    }).catch((data) => {
      self.resetErr = data;
    });
  }

  close():void {
    if(this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
