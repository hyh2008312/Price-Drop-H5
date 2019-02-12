import { Component, OnInit, OnDestroy, Inject, NgZone} from '@angular/core';

import { SizeChartService } from '../sizeChart.service';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material';

import { saveAs } from 'file-saver';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ENTER } from '@angular/cdk/keycodes';

import { AddTabDialogComponent } from  '../add-tab-dialog/add-tab-dialog.component';
import { MatSnackBar } from '@angular/material';
import {ToolTipsComponent} from '../tool-tips/tool-tips.component';

@Component({
  selector: 'app-sizeChart-edit',
  templateUrl: './sizeChart-edit.component.html',
  styleUrls: ['../_sizeChart.scss']
})

export class SizeChartEditComponent implements OnInit {


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
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {

    this.sizeChartForm = this.fb.group({
      chartId: [''],
      name: ['', Validators.required],
      note: ['']
    });

    this.getDetail();
  }

  ngOnInit(): void {}

  ngOnDestroy() {}

  getDetail() {
    this.sizeChartService.getSizeChart({
      chart_id: this.activatedRoute.snapshot.params['id']
    }).then((data) => {
      this.sizeChartForm.patchValue({
        chartId: data.id,
        name: data.name,
        note: data.sizeChart.note,
      });
      this.image = data.sizeChart.image;
      this.imageList = data.sizeChart.imageList && data.sizeChart.imageList.length > 0? data.sizeChart.imageList: this.imageList;
      this.sizeChart = data.sizeChart.table
    });
  }

  save() {
    if(this.sizeChartForm.invalid) {
      return;
    }

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

    this.sizeChartService.editSizeChart(params).then((data) => {
      this.openSnackBar('Successfully Saved!');
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

  openSnackBar(str) {
    this.snackBar.openFromComponent(ToolTipsComponent, {
      data: str,
      duration: 4000,
      verticalPosition: 'top'
    });
  }

  generateInch($event, item) {
    if (!item.name.includes('(cm)')) {
      this.openSnackBar('This Tab cannot generate inch table!');
      return;
    }
    let chart: any = {};
    let tab = item.name.split('(cm)');
    chart.name = tab[0] + '(in)';
    chart.children = [];
    for (let i = 0; i < item.children.length; i++) {
      const itm = item.children[i];
      let _itm: any = {};
      if (i == 0) {
        if (itm.name.includes('(cm)')) {
          let itm1: any = itm.name.split('(cm)');
          _itm.name = itm1 + '(in)';
        } else {
          _itm.name = itm.name;
        }
        _itm.value = [];
        for (let j = 0; j < itm.value.length; j++) {
          let _itm1: any = {};
          let im = itm.value[j];
          if (im.value.includes('(cm)')) {
            _itm1.value = im.value.split('(cm)')[0] + '(in)';
          } else {
            _itm1.value = im.value;
          }
          _itm.value.push(_itm1);
        }
      } else {
        _itm.name = itm.name;
        _itm.value = [];
        for (let j = 0; j < itm.value.length; j++) {
          let _itm1: any = {};
          let im = itm.value[j];
          if (im.value.includes('-')) {
            _itm1.value = (parseFloat(im.value.split('-')[0]) / 2.54).toFixed(1) + '-' + (parseFloat(im.value.split('-')[1]) / 2.54).toFixed(1);
          } else {
            _itm1.value = (parseFloat(im.value) / 2.54).toFixed(1);
          }
          _itm.value.push(_itm1);
        }
      }

      chart.children.push(_itm);

    }
    this.sizeChart.unshift(chart);
    this.selectedIndex = 0;
  }
}
