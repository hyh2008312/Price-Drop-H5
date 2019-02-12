 import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { LotteryService } from '../lottery.service';

@Component({
  selector: 'app-lottery-add-note-dialog',
  templateUrl: './add-note-dialog.component.html',
  styleUrls: ['../_lottery.scss']
})

export class AddNoteDialogComponent implements OnInit {

  noteForm : FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private lotteryService: LotteryService
  ) {
    this.noteForm = this.fb.group({
      notes: ['', Validators.required]
    });

    this.noteForm.patchValue({
      notes: this.data.order.orderNotes
    });

  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  addOrderNotes() {
    if(this.noteForm.invalid) return;
    const self = this;
    this.lotteryService.addOrderNotes({
      id: this.data.order.id,
      notes: this.noteForm.value.notes
    }).then((data) => {
      if(data.id) {
        self.data.isNoteAdd = true;
        self.data.order = data;
        self.close();
      }
    });
  }

}
