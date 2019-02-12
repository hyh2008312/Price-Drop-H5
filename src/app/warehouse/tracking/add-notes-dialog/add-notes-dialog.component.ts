import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { TrackingService } from '../tracking.service';

@Component({
  selector: 'app-warehouse-tracking-add-notes-dialog',
  templateUrl: './add-notes-dialog.component.html',
  styleUrls: ['../_tracking.scss']
})

export class AddNotesDialogComponent implements OnInit {

  noteForm : FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNotesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private homeService: TrackingService
  ) {
    this.noteForm = this.fb.group({
      id: [''],
      notes: ['', Validators.required]
    });

    this.noteForm.patchValue({
      id: this.data.item.id,
      notes: this.data.item.notes
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
    this.homeService.addNotes(this.noteForm.value).then((data) => {
      if(data.id) {
        self.data.isEdit = true;
        self.data.item = data;
        self.close();
      }
    });
  }

}
