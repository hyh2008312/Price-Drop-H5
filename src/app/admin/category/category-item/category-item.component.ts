import { Input, Output, Component, OnInit,EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['../_category.scss']
})

export class CategoryItemComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any;
  @Input() index: number = 0;
  @Output() productChange = new EventEmitter<any>();

  categoryForm: FormGroup;
  currency: string = 'INR';

  isEdit: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      index: [1, Validators.required],
      show: ['false', Validators.required]
    });
  }

  ngOnInit(): void {


  }


  edit() {
    this.isEdit = !this.isEdit;
    this.categoryForm.patchValue({
      id: this.product.id,
      name: this.product.name,
      index: this.product.index,
      show: this.product.show
    });
  }

  delete() {
    this.categoryService.categoryDelete(this.product).then((data) => {
      if(data.result == 'success') {
        this.productChange.emit({
          index: this.index,
          product : this.product,
          status: this.status,
          event: 'delete'
        });
      }
    });
  }

  save() {
    if(this.categoryForm.invalid) {
      return;
    }
    let params:any = this.categoryForm.value;
    params.image = this.product.image;
    this.categoryService.categoryEdit(params).then((data) => {
      this.isEdit = !this.isEdit;
      this.product = data;
      this.productChange.emit({
        index: this.index,
        product : this.product,
        status: this.status,
        event: 'edit'
      });
    });
  }

}
