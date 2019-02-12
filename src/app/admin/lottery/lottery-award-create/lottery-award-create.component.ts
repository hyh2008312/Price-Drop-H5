import { Component, OnInit, OnDestroy, Inject, NgZone} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators , FormArray } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { MatDialog } from '@angular/material';

import { LotteryService } from '../lottery.service';
import { UserService } from  '../../../shared/services/user/user.service';

import { MatChipInputEvent } from '@angular/material';
import { ENTER } from '@angular/cdk/keycodes';

import { ImageUploadPreviewService } from "../../../shared/components/image-upload-preview/image-upload-preview.service";
import { S3UploaderService } from "../../../shared/services/s3-upload/s3-upload.service";

@Component({
  selector: 'app-lottery-award-create',
  templateUrl: './lottery-award-create.component.html',
  styleUrls: ['../_lottery.scss']
})

export class LotteryAwardCreateComponent implements OnInit {

  step: number = 0;

  productId: any;

  categoryList:any = [];
  subCategoryList: any;
  thirdCategoryList: any;

  shippingTypeList = [{
    name: 'Free Shipping',
    type: 'Free'
  }, {
    name: 'Standard Shipping',
    type: 'Standard'
  }, {
    name: 'Expedited Shipping',
    type: 'Expedited'
  }];

  shippingMethodList = ['EMS','DHL'];

  shippingTimeList = [{
    value: '5-10',
    text: '5 - 10 business days'
  }, {
    value: '7-12',
    text: '7 - 12 business days'
  }, {
    value: '10-15',
    text: '10 - 15 business days'
  }, {
    value: '14-21',
    text:'14 - 21 business days'
  },{
    value: '21-28',
    text: '21 - 28 business days'
  },{
    value: '0',
    text: 'other'
  }];

  YesOrNo = [{
    text: "Yes",
    value: true
  }, {
    text: 'No',
    value: false
  }];

  variantList:any[] = [];

  isProductListShow: boolean = false;

  variantAddedList: any[] = [];

  productForm : FormGroup;

  countries: Object[];

  // Enter, comma
  separatorKeysCodes = [ENTER, 188];

  previewImgFile: any;
  previewImgSrcs: any;

  additionalList: any = [];
  additionalSrcs: any = [];

  colorImageList: any[] = [];

  public editor;
  public editorImageId = 'quillImage';

  get shipping() { return this.productForm.get('shippings') as FormArray; }
  get product() { return this.productForm.get('variants') as FormArray; }
  get attributes() { return this.productForm.get('attributes') as FormArray; }

  isSuperUser: boolean = false;

  sub: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private adminService: LotteryService,
    private ngZone: NgZone,
    private previewImageService: ImageUploadPreviewService,
    private s3UploaderService: S3UploaderService,
    @Inject(DOCUMENT) private document: Document,
    private userService :UserService
  ) {

    this.productForm = this.fb.group({
      title: ['', Validators.required],
      grandParentId: [null, Validators.required],
      parentId: [null],
      childId: [null],
      images: [[]],
      attributes: this.fb.array([]),
      variants: this.fb.array([]),
      shippings: this.fb.array([]),
      background: ['', Validators.required],
      purchaseLink: [' ', Validators.required]
    });

    this.addProductList();
    this.addShippingList();

    this.sub = this.userService.currentUser.subscribe((data) => {
      if(data && data.isStaff && data.isSuperuser) {
        this.isSuperUser = true;
      }
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addShippingList() {

    this.shipping.push(this.fb.group({
      countryId: ['', Validators.required],
      type: ['', Validators.required],
      id: ['', Validators.required],
      price: [0, Validators.required],
      checked: [false, Validators.required],
      shippingTime: ['', Validators.required],
      shippingTimeMin: [0, Validators.required],
      shippingTimeMax: [0, Validators.required]
    }));
  }

  changeShippingMethod($event, p) {
    this.adminService.getShippingList($event).then((data) => {
      p.shippingMethodList = data;
    });
  }

  changeShippingPrice($event, p) {

    p.patchValue({
      price: 0,
      shippingTime: 0,
      checked: false,
      shippingTimeMin: 0,
      shippingTimeMax: 0
    });
  }

  add(event: MatChipInputEvent, list: any): void {
    let input = event.input;
    let value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      if(list.hasColorImage) {
        this.colorImageList.push({
          value: value.trim(),
          image: false
        });
        list.colorImageList.push({
          value: value.trim(),
          image: false
        });
      }
      list.value.push({
        id: list.option,
        value: value.trim()
      });
      this.addProductList(true);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(item: any, list: any): void {
    let index = list.value.indexOf(item);

    if (index >= 0) {
      list.value.splice(index, 1);
      if(list.hasColorImage) {
        list.colorImageList.splice(index, 1);
        let _index = this.colorImageList.findIndex((data) => {
          if(data.value == item) {
            return true;
          }
        });

        if(_index >= 0) {
          this.colorImageList.splice(_index, 1);
        }
      }

      this.addProductList(true);
    }

  }


  deleteShippingObject(i) {
    this.shipping.removeAt(i);
  }

  addProductList(variant?: any) {

    if(variant) {
      if(this.isProductListShow == false) {
        this.product.removeAt(0);
      }
      if(!this.isProductListShow) {
        this.isProductListShow = true;
      }

      let Arr = [];
      for(let item of this.variantAddedList) {
        Arr.push(item.value);
      }

      let newArr = this.formatVariantArray(Arr);

      this.product.controls = [];

      if(newArr.length > 0) {
        for(let item of newArr) {
          let idArr = item.id.toString().split(',');
          let valueArr = item.value.toString().split(',');
          let newArr = new Array(idArr.length);
          let image = '';
          for(let i = 0; i < newArr.length; i++) {
            newArr[i] = {};
            newArr[i].attributeId = parseInt(idArr[i]);
            newArr[i].value = valueArr[i].trim();
            if(newArr[i].attributeId == 2) {
              for(let item of this.colorImageList) {
                if(item.value == newArr[i].value && item.image) {
                  image = item.image;
                  break;
                }
              }
            }
          }

          this.product.push(this.fb.group({
            variant: [item],
            attributes: [newArr],
            mainImage: [image],
            sku: ['lottery' + new Date(), Validators.required],
            stock: [50000, Validators.required],
            saleUnitPrice: [1, Validators.required],
            lowestPrice: [0, Validators.required],
            unitPrice: [1, Validators.required],
            costPrice: [1]
          }));
        }
      } else {
        this.isProductListShow = false;
        this.product.push(this.fb.group({
          attributes: [[]],
          mainImage: [''],
          sku: ['lottery' + new Date(), Validators.required],
          stock: [50000, Validators.required],
          saleUnitPrice: [1, Validators.required],
          lowestPrice: [0, Validators.required],
          unitPrice: [1, Validators.required],
          costPrice: [1]
        }));
      }


    } else {
      this.product.push(this.fb.group({
        attributes: [[]],
        mainImage: [''],
        sku: ['lottery' + new Date(), Validators.required],
        stock: [50000, Validators.required],
        saleUnitPrice: [1, Validators.required],
        lowestPrice: [0, Validators.required],
        unitPrice: [1, Validators.required],
        costPrice: [1]
      }));
    }

  }

  formatVariantArray(doubleArrays) {
    let len = doubleArrays.length;
    if (len >= 2) {
      let len1 = doubleArrays[0].length;
      let len2 = doubleArrays[1].length;
      let newlen = len1 * len2;
      let temp = new Array(newlen);
      let index = 0;
      for (let i = 0; i < len1; i++) {
        for (let j = 0; j < len2; j++) {
          temp[index] = {};
          temp[index].id = doubleArrays[0][i].id + ',' + doubleArrays[1][j].id;
          temp[index].value = doubleArrays[0][i].value + ', ' + doubleArrays[1][j].value;
          index++;
        }
      }
      let newArray = new Array(len - 1);
      for (let i = 2; i < len; i++) {
        newArray[i - 1] = doubleArrays[i];
      }
      newArray[0] = temp;
      return this.formatVariantArray(newArray);
    }
    else {
      return doubleArrays.length > 0 && doubleArrays[0].length > 0? doubleArrays[0]: [];
    }
  }

  optionChange($event, item) {
    item.option = $event;
    item.isValue = true;
    item.value = [];
    if(item.option == 2) {
      item.hasColorImage = true;
      item.colorImageList = [];
    }
    this.addProductList(true);
  }

  categoryChange($event) {
    if(this.categoryList.length > 0) {
      let index = this.categoryList.findIndex((data) => {
        if(data.id == $event) {
          return true;
        }
      });
      if(this.categoryList[index] && this.categoryList[index].children) {
        this.subCategoryList = [...this.categoryList[index].children];
        this.thirdCategoryList = [];
        this.productForm.patchValue({
          parentId: null,
          childId: null
        });
      } else {
        this.subCategoryList = false;
        this.thirdCategoryList = false;
        this.productForm.patchValue({
          parentId: null,
          childId: null
        });
      }
    }
  }

  subCategoryChange($event) {
    if(this.subCategoryList.length > 0) {
      let index = this.subCategoryList.findIndex((data) => {
        if(data.id == $event) {
          return true;
        }
      });
      if(this.subCategoryList[index] && this.subCategoryList[index].children) {
        this.thirdCategoryList = [...this.subCategoryList[index].children];
        this.productForm.patchValue({
          childId: null
        });
      } else {
        this.thirdCategoryList = false;
        this.productForm.patchValue({
          categoryId: null
        });
      }
    }
  }

  showMinAndMaxTime($event, index, item) {
    if(index == 5) {
      item.patchValue({
        checked: true
      });
    } else {
      let timeArr = this.shippingTimeList[index].value.split('-');
      item.patchValue({
        checked: false,
        shippingTimeMin: timeArr[0],
        shippingTimeMax: timeArr[1]
      });
    }
  }

  ngOnInit():void {
    this.adminService.getCategoryList().then((data) => {
      this.categoryList = data;
    });

    this.adminService.getCountryList().then((data) => {
      this.countries = data;
    });
  }

  continue() {
    let product = this.productForm.value;
    this.step = 1;
    this.ngZone.runOutsideAngular(() => {
      this.document.querySelector('html').scrollTop = 0;
    });
  }

  publish() {
    if(this.productForm.invalid) {
      return;
    }
    let product = this.productForm.value;
    product.images = this.additionalList;

    product.attributes = this.addProductWithAttributes();

    let self = this;
    this.adminService.productCreate(product).then((data) => {
      self.ngZone.runOutsideAngular(() => {
        self.document.querySelector('html').style.top = '0';
      });
      self.router.navigate(['../../'], { queryParams: {tab: 'pending'}, replaceUrl: true, relativeTo: this.activatedRoute});
    });
  }

  addProductWithAttributes() {
    let attributes = [];
    for(let item of this.variantAddedList) {
      let id = item.option;
      let name = '';
      let Image = '';
      let index = this.variantList.findIndex((data) => {
        if(data.id == id) {
          return true;
        }
      });
      if(index > -1) {
        name = this.variantList[index].name;
      }
      attributes.push({
        id,
        name,
        value: item.value,
        images: item.colorImageList
      });
    }
    return attributes;
  }

  openLeaveDialog() {
    this.router.navigate(['../../'], { replaceUrl: true, relativeTo: this.activatedRoute});
  }

}
