import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { TopicService } from '../topic.service';
import {SelectProductDialogComponent} from '../select-product-dialog/select-product-dialog.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-promote-promote-edit',
  templateUrl: './promote-edit.component.html',
  styleUrls: ['../_topic.scss']
})

export class PromoteEditComponent implements OnInit {

  campaign: any = {};

  id: any = '';
  templateId: any = '';

  constructor(
    private promoteService: TopicService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {

    this.templateId = this.activatedRoute.snapshot.params['templateId'];
  }

  ngOnInit(): void {}

}
