import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TopicService } from '../topic.service';

@Component({
  selector: 'app-promote-change-variant-dialog',
  templateUrl: './change-variant-dialog.component.html',
  styleUrls: ['../_topic.scss']
})

export class ChangeVariantDialogComponent implements OnInit {

  currency: string = 'USD';

  constructor(
    public dialogRef: MatDialogRef<ChangeVariantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private promoteService: TopicService
  ) {
  }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close();
  }

  variantChange($event) {
    switch($event.event) {
      case 'edit':
        this.data.isEdit = true;
        break;
      case 'delete':
        this.data.variantPromotions.splice($event.index,1);
        this.data.isEdit = true;
        break;
    }
  }


}
