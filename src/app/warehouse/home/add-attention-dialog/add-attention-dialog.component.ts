import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { HomeService } from '../home.service';

@Component({
  selector: 'app-warehouse-home-add-attention-dialog',
  templateUrl: './add-attention-dialog.component.html',
  styleUrls: ['../_home.scss']
})

export class AddAttentionDialogComponent implements OnInit {

  noteForm : FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddAttentionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private homeService: HomeService
  ) {
    this.noteForm = this.fb.group({
      id: [''],
      attention: ['', Validators.required]
    });

    this.noteForm.patchValue({
      id: this.data.item.id,
      attention: this.data.item.attention
    });

  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  addAttention() {
    if(this.noteForm.invalid) return;
    const self = this;
    this.homeService.addAttention(this.noteForm.value).then((data) => {
      if(data.id) {
        self.data.isEdit = true;
        self.data.item = data;
        self.close();
      }
    });
  }

}
