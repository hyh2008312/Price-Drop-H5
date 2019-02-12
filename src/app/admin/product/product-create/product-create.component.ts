import { Component, OnInit, OnDestroy, Inject, NgZone} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators , FormArray } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { MatDialog } from '@angular/material';

import { ProductService } from '../product.service';
import { UserService } from  '../../../shared/services/user/user.service';

import { MatChipInputEvent } from '@angular/material';
import { ENTER } from '@angular/cdk/keycodes';

import { SaveProductDialogComponent } from '../save-product-dialog/save-product-dialog.component';
import { PendingProductDialogComponent } from '../pending-product-dialog/pending-product-dialog.component';

import { ImageUploadPreviewService } from "../../../shared/components/image-upload-preview/image-upload-preview.service";
import { S3UploaderService } from "../../../shared/services/s3-upload/s3-upload.service";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['../product.scss']
})

export class ProductCreateComponent implements OnInit {

  step: number = 0;

  productId: any;

  selectable = true;
  removable = true;

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

  countries: any;

  // Enter, comma
  separatorKeysCodes = [ENTER, 188];

  additionalList: any = ['', '', '', '', ''];
  additionalSrcs: any = ['', '', '', '', ''];

  colorImageList: any[] = [];

  public editor;
  public editorImageId = 'quillImage';

  get shipping() { return this.productForm.get('shippings') as FormArray; }
  get product() { return this.productForm.get('variants') as FormArray; }
  get attributes() { return this.productForm.get('attributes') as FormArray; }
  get specification() { return this.productForm.get('specification') as FormArray; }

  isSuperUser: boolean = false;

  sub: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private adminService: ProductService,
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
      aliasSize: [''],
      aliasColor: [''],
      attributes: this.fb.array([]),
      specification: this.fb.array([]),
      variants: this.fb.array([]),
      shippings: this.fb.array([]),
      brandName: [''],
      description: ['Please add product details and images', Validators.required],
      length: [0, Validators.required],
      width: [0, Validators.required],
      height: [0, Validators.required],
      weight: [0, Validators.required],
      shippingWeight: [0, Validators.required],
      shopName: [''],
      supplierLocation: [''],
      processingTime: ['5-7'],
      minimumQuantity: [1],
      customsDeclaredCharge: [0, Validators.required],
      originCountryId: [null, Validators.required],
      isPowder: [false, Validators.required],
      isLiquid: [false, Validators.required],
      isBattery: [false, Validators.required],
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

  onEditorCreated(quill) {
    this.editor = quill;

    let self = this;
    this.editor.getModule('toolbar').addHandler("image", (image) => {
      if(image) {
        var fileInput = document.getElementById(self.editorImageId);
        fileInput.click();
      }
    });
  }

  addPicture(event) {
    if(!event.target.files[0]) {
      return;
    }
    let that = this;
    this.previewImageService.readAsDataUrl(event.target.files[0]).then(function(result) {

      let file = event.target.files[0];

      let image = new Image();
      image.onload = function(){
        let width = image.width;
        let height = image.height;

        that.s3UploaderService.upload({
          type: 'product/main',
          fileName: file.name,
          use: 'detail',
          width: width,
          height: height
        }).then((data)=> {
          let imageUrl = `${data.url}/${data.name}`;
          that.s3UploaderService.uploadToS3WithoutLoading(file, data).then((data) => {
            let range = that.editor.getSelection();
            that.editor.insertEmbed(range.index, 'image', imageUrl);
          });
        });
      };
      image.src = window.URL.createObjectURL(file);

    });
  }

  changeStep(index) {
    this.ngZone.runOutsideAngular(() => {
      this.document.querySelector('html').scrollTop = 0;
    });
    this.step = index;
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

  deleteVariant(index:any) {
    let item = this.variantAddedList[index];
    if(item.option == 2) {
      if(item.colorImageList) {
        for(let value of item.colorImageList) {
          let _index = this.colorImageList.findIndex((data) => {
            if(data.value == value.value) {
              return true;
            }
          });
          if(_index > -1) {
            this.colorImageList.splice(_index,1);
          }
        }
      }
    }
    this.variantAddedList.splice(index, 1);

    this.addProductList(true);
  }

  deleteVariantObject(i) {
    this.product.removeAt(i);
  }

  deleteShippingObject(i) {
    this.shipping.removeAt(i);
  }

  addVariantList() {
    let option = {
      option: '',
      isValue: false,
      value: [],
      visible: true,
      selectable: true,
      removable: true,
      addOnBlur: true,
      hasColorImage: false,
      colorImageList: []
    };

    this.variantAddedList.push(option);
  }

  addVariantImage($event, p) {
    p.image = $event.file;
    for(let item of this.colorImageList) {
      if(item.value == p.value) {
        item.image = p.image;
        break;
      }
    }
    this.addProductList(true);
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
            stock: [50000, Validators.required],
            saleUnitPrice: [1, Validators.required],
            sourcingPrice: [1, Validators.required],
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
          stock: [50000, Validators.required],
          saleUnitPrice: [1, Validators.required],
          sourcingPrice: [1, Validators.required],
          lowestPrice: [0, Validators.required],
          unitPrice: [1, Validators.required],
          costPrice: [1]
        }));
      }


    } else {
      this.product.push(this.fb.group({
        attributes: [[]],
        mainImage: [''],
        stock: [50000, Validators.required],
        saleUnitPrice: [1, Validators.required],
        sourcingPrice: [1, Validators.required],
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
    this.specification.controls = [];
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
      this.getAttributeDetail($event);
    }
  }

  thirdCategoryChange($event) {
    this.getAttributeDetail($event);
  }

  getAttributeDetail($event) {
    this.adminService.getCategoryAttributeDetail({
      id: $event
    }).then((data) => {
      this.specification.controls = [];
      for(let item of data.specificationList) {
        this.specification.push(this.fb.group({
          name: [item.name, Validators.required],
          specificationId: [item.specificationId, Validators.required],
          content: [''],
          sort: [item.sort, Validators.required],
          specificationValues: [item.specificationValues?item.specificationValues.split(','):[]],
          contentList: [[]]
        }));
      }

    });
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

    this.adminService.getVariantList().then((data) => {
      this.variantList = data;
    });

    this.adminService.getCountryList().then((data) => {
      this.countries = data;
      this.productForm.patchValue({
        countryId: this.countries[0].id
      })
    });

  }

  openLeaveDialog() {
    let dialogRef = this.dialog.open(SaveProductDialogComponent, {
      data: {
        isSaved: false
      }
    });

    let self = this;
    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isSaved == true) {
        self.createDraft();
      } else {
        self.router.navigate(['../'], { replaceUrl: true, relativeTo: this.activatedRoute});
      }
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
    const images: any = [];
    for(let item of this.additionalList) {
      if(item && item != '') {
        images.push(item);
      }
    }
    if(images.length <= 0) {
      return;
    }
    product.images = images;

    product.attributes = this.addProductWithAttributes();

    let self = this;
    this.adminService.productCreate(product).then((data) => {
      self.openPendingProductDialog();
      self.ngZone.runOutsideAngular(() => {
        self.document.querySelector('html').style.top = '0';
      });
      self.router.navigate(['../'], { queryParams: {tab: 'pending'}, replaceUrl: true, relativeTo: this.activatedRoute});
    });
  }

  createDraft() {
    let product = this.productForm.value;
    product.images = this.additionalList;
    let self = this;

    let shippings = [];
    for(let item of product.shippings) {
      if(item.countryId != '' && item.shippingId != '') {
        shippings.push(item);
      }
    }

    product.shippings = shippings;
    product.attributes = this.addProductWithAttributes();

    this.adminService.productDraftCreate(product).then((data) => {
      self.ngZone.runOutsideAngular(() => {
        self.document.querySelector('html').style.top = '0';
      });
      self.router.navigate(['../'], { queryParams: {tab: 'draft'}, replaceUrl: true, relativeTo: this.activatedRoute});
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

  openPendingProductDialog() {
    let dialogRef = this.dialog.open(PendingProductDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngZone.runOutsideAngular(() => {
        this.document.querySelector('html').style.top = '0';
      });
    });
  }

  addAttribute(event, p): void {
    const index = p.value.contentList.findIndex((e) => {
      return e == event;
    });

    if (index >= 0) {
      return;
    }

    let arr: any = [...p.value.contentList];
    arr.push(event);

    p.patchValue({
      contentList: arr,
      content: arr.join(',')
    });
  }

  removeAttribute(params: any, p): void {
    const index = p.value.contentList.findIndex((e) => {
      return e == params;
    });

    if (index >= 0) {
      let arr: any = [...p.value.contentList];
      arr.splice(index, 1);

      p.patchValue({
        contentList: arr,
        content: arr.join(',')
      });
    }


  }

}
