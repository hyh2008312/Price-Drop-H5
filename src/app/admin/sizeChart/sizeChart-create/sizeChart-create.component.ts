import { Component, OnInit, OnDestroy, Inject, NgZone} from '@angular/core';

import { SizeChartService } from '../sizeChart.service';
import { ActivatedRoute, Router } from '@angular/router';

import {MatDialog} from '@angular/material';

import { saveAs } from 'file-saver';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ENTER } from '@angular/cdk/keycodes';

import { AddTabDialogComponent } from  '../add-tab-dialog/add-tab-dialog.component';

@Component({
  selector: 'app-sizeChart-create',
  templateUrl: './sizeChart-create.component.html',
  styleUrls: ['../_sizeChart.scss']
})

export class SizeChartCreateComponent implements OnInit {


  sizeChartForm: FormGroup;
  error: any = false;

  sizeChart: any = [];

  selectable:boolean = true;
  removable:boolean = true;
  addOnBlur:boolean = true;

  selectedIndex: any = 0;

  separatorKeysCodes = [ENTER, 188];
  image: any;
  imageList: any = ['', '', '', '', ''];

  constructor(
    private sizeChartService: SizeChartService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {

    this.sizeChartForm = this.fb.group({
      name: ['', Validators.required],
      note: ['']
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {}

  save() {
    let params: any = this.sizeChartForm.value;
    let imageList: any = [];
    for(let item of this.imageList) {
      if(item && item != '') {
        imageList.push(item);
      }
    }

    params.sizeChart = {
      table: this.sizeChart,
      note: this.sizeChartForm.value.note,
      image: this.image,
      imageList
    };

    this.sizeChartService.createSizeChart(params).then((data) => {
      this.router.navigate(['../'], { replaceUrl: true, relativeTo: this.activatedRoute});
    });
  }

  addTabName() {
    let dialogRef = this.dialog.open(AddTabDialogComponent, {
      data: {
        isEdit: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isEdit == true) {
        this.sizeChart.push({
          name: dialogRef.componentInstance.data.name,
          children: []
        });
        this.selectedIndex = this.sizeChart.length - 1;
      }
    });

  }

  deleteName($event) {
    this.sizeChart.splice(this.selectedIndex, 1);
    this.selectedIndex = 0;
  }

  getSubTabList($event) {

  }

  addColoumn() {
    this.sizeChart[this.selectedIndex].children.push({
      name: '',
      value: []
    });
  }

  deleteColumn(i) {
    this.sizeChart[this.selectedIndex].children.splice(i, 1);
  }

  remove(index, item) {
    item.value.splice(index, 1);
  }

  add($event: any, p) {
    let input = $event.input;
    let value = $event.value;

    // Add our fruit
    if ((value || '').trim()) {
      const _val = value.split(',');
      if(_val.length > 1) {
        for(let item of _val) {
          p.value.push({
            value: item
          });
        }
      } else {
        p.value.push({
          value: value
        });
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

  }
}
