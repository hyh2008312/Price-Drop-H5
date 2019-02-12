import {Input, Output, Component, OnInit, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { KeywordsService } from '../keywords.service';

@Component({
  selector: 'app-admin-hotword-item',
  templateUrl: './hotword-item.component.html',
  styleUrls: ['../_keywords.scss']
})

export class HotwordItemComponent implements OnInit {

  hotwordForm : FormGroup;

  @Input() status = 0;
  @Input() item: any = {};
  @Input() index: any = 0;
  @Output() userChange = new EventEmitter<any>();

  isEdit: boolean = false;

  constructor(
      private keywordsService: KeywordsService,
      private fb: FormBuilder
  ) {
    this.hotwordForm = this.fb.group({
      id: ['', Validators.required],
      key: ['', Validators.required],
      index: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  delete() {
    this.keywordsService.hotwordDelete(this.item).then((data) => {
      this.userChange.emit({
        status: this.status,
        index: this.index,
        event: 'delete',
        item: this.item
      });
    }).catch(() => {});
  }

  edit() {
    if(!this.isEdit) {
      this.isEdit = true;
      this.hotwordForm.patchValue({
        id: this.item.id,
        key: this.item.keyWords,
        index: this.item.index
      })
    } else {

      if(this.hotwordForm.invalid) {
        return;
      }

      this.keywordsService.hotwordEdit(this.hotwordForm.value).then((data) => {
        this.item = data;
        this.isEdit = false;
        this.userChange.emit({
          status: this.status,
          index: this.index,
          event: 'edit',
          item: this.item
        });
      }).catch(() => {});
    }
  }
}
