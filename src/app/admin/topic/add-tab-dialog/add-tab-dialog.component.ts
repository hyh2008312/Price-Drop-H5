import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TopicService } from '../topic.service';

@Component({
  selector: 'app-promote-add-tab-dialog',
  templateUrl: './add-tab-dialog.component.html',
  styleUrls: ['../_topic.scss']
})

export class AddTabDialogComponent implements OnInit {

  currency: string = 'USD';

  searchKey: any = '';
  isSearch: boolean = false;
  activityTabForm: FormGroup;

  error: any = false;

  length = 12;
  page = 1;
  pageSize = 6;

  constructor(
    public dialogRef: MatDialogRef<AddTabDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private topicService: TopicService,
    private fb: FormBuilder
  ) {

    this.activityTabForm = this.fb.group({
      activityId: [''],
      name: ['']
    });

    this.activityTabForm.patchValue({
      activityId: this.data.activityId
    })

  }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close();
  }

  publish() {
    let params:any = this.activityTabForm.value;
    this.topicService.addSubeventName(params).then((data) => {
      if(data.id) {
        this.error = false;
        this.data.isEdit = true;
        this.close();
      } else {
        this.error = data.detail;
      }
    });
  }

}
