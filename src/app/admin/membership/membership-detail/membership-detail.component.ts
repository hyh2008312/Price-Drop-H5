import { Component, OnInit, OnDestroy, Inject, NgZone} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators , FormArray } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { MatDialog } from '@angular/material';

import { MembershipService } from '../membership.service';
import { UserService } from  '../../../shared/services/user/user.service';

import { MatChipInputEvent } from '@angular/material';
import { ENTER } from '@angular/cdk/keycodes';

import { ImageUploadPreviewService } from "../../../shared/components/image-upload-preview/image-upload-preview.service";
import { S3UploaderService } from "../../../shared/services/s3-upload/s3-upload.service";

@Component({
  selector: 'app-membership-detail',
  templateUrl: './membership-detail.component.html',
  styleUrls: ['../_membership.scss']
})

export class MembershipDetailComponent implements OnInit {

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

  shippingMethodList:any = [];

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
    private adminService: MembershipService,
    private ngZone: NgZone,
    private previewImageService: ImageUploadPreviewService,
    private s3UploaderService: S3UploaderService,
    @Inject(DOCUMENT) private document: Document,
    private userService :UserService
  ) {

    this.productForm = this.fb.group({
      id: [''],
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

    this.getProductDetail();

    this.sub = this.userService.currentUser.subscribe((data) => {
      if(data && data.isStaff && data.isSuperuser) {
        this.isSuperUser = true;
      }
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getProductDetail() {

    const id = this.activatedRoute.snapshot.params['id'];
    this.adminService.getPrizeDetail({
      id
    }).then((data) => {
      this.productForm.patchValue({
        id: data.id,
        title: data.title,
        grandParentId: data.productCategories[0].grandParentId,
        parentId: data.productCategories[0].parentId,
        childId: data.productCategories[0].childId,
        images: data.images,
        background: data.background,
        purchaseLink: data.purchaseLink
      });

      this.additionalList = data.images;
      this.additionalSrcs = data.images;

      this.product.push(this.fb.group({
        id: [data.variants[0].id],
        attributes: [data.variants[0].attributes],
        mainImage: [data.variants[0].mainImage],
        sku: [data.variants[0].sku, Validators.required],
        variantStockrecord: [data.variants[0].variantStockrecord, Validators.required],
        saleUnitPrice: [data.variants[0].saleUnitPrice, Validators.required],
        lowestPrice: [data.variants[0].lowestPrice, Validators.required],
        unitPrice: [data.variants[0].unitPrice],
        costPrice: [data.variants[0].costPrice]
      }));

      this.adminService.getCategoryList().then((value) => {
        this.categoryList = [...value];
        this.categoryChangeNew(data.productCategories[0].grandParentId);
        this.subCategoryChangeNew(data.productCategories[0].parentId);
      });


      let shippingTime = data.shippingPrices[0].shippingTimeMin+ '-' + data.shippingPrices[0].shippingTimeMax;
      let index = this.shippingTimeList.findIndex((data) => {
        if(data.value == shippingTime) {
          return true;
        }
      });

      this.shipping.push(this.fb.group({
        countryId: [data.shippingPrices[0].countryId, Validators.required],
        type: [data.shippingPrices[0].type, Validators.required],
        id: [data.shippingPrices[0].id, Validators.required],
        shippingId: [data.shippingPrices[0].shippingId, Validators.required],
        price: [data.shippingPrices[0].priceItem, Validators.required],
        checked: [index > -1? false : true, Validators.required],
        shippingTime: [index > -1? shippingTime : '0', Validators.required],
        shippingTimeMin: [data.shippingPrices[0].shippingTimeMin, Validators.required],
        shippingTimeMax: [data.shippingPrices[0].shippingTimeMax, Validators.required]
      }));

      this.changeShippingMethod(data.shippingPrices[0].countryId);
    });
  }

  changeShippingMethod($event) {
    this.adminService.getShippingList($event).then((data) => {
      this.shippingMethodList = data;
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
            sku: ['', Validators.required],
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
          sku: ['', Validators.required],
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
        sku: ['', Validators.required],
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

  categoryChangeNew($event) {
    if(this.categoryList.length > 0) {
      let index = this.categoryList.findIndex((data) => {
        if(data.id == $event) {
          return true;
        }
      });
      if(this.categoryList[index] && this.categoryList[index].children) {
        this.subCategoryList = [...this.categoryList[index].children];
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
          parentId: null,
          childId: null
        });
      }
    }
  }

  subCategoryChangeNew($event) {
    if(this.subCategoryList.length > 0) {
      let index = this.subCategoryList.findIndex((data) => {
        if(data.id == $event) {
          return true;
        }
      });
      if(this.subCategoryList[index] && this.subCategoryList[index].children) {
        this.thirdCategoryList = [...this.subCategoryList[index].children];
      } else {
        this.thirdCategoryList = false;
        this.productForm.patchValue({
          childId: null
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
    this.adminService.changePrizeDetail(product).then((data) => {
      self.ngZone.runOutsideAngular(() => {
        self.document.querySelector('html').style.top = '0';
      });
      self.router.navigate(['../../../'], { queryParams: {tab: 'prize'}, replaceUrl: true, relativeTo: this.activatedRoute});
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
    this.router.navigate(['../../../'], { replaceUrl: true, relativeTo: this.activatedRoute});
  }

}
