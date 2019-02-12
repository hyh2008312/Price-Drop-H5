import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { KeywordsService } from '../keywords.service';

@Component({
  selector: 'app-admin-add-hotword-dialog',
  templateUrl: './add-hotword-dialog.component.html',
  styleUrls: ['../_keywords.scss']
})

export class AddHotwordDialogComponent implements OnInit {

  hotwordForm : FormGroup;
  error: any = false;

  constructor(
    public dialogRef: MatDialogRef<AddHotwordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private specificationService: KeywordsService
  ) {
    this.hotwordForm = this.fb.group({
      key: ['', Validators.required],
      index: ['', Validators.required]
    });

  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  create() {
    if(this.hotwordForm.invalid) {
      return;
    }

    let self = this;
    this.specificationService.hotwordCreate(this.hotwordForm.value).then((data) => {
      if(data.id) {
        self.close();
        self.data.isHotwordEdit= true;
      } else {
        self.error = 'Duplicate Words!';
      }
    }).catch(() => {
      self.error = 'Duplicate Words!';
    });
  }
}
