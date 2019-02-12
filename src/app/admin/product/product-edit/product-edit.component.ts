import { Component, OnInit, OnDestroy, AfterContentChecked, Inject, NgZone} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators , FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { MatDialog } from '@angular/material';

import { ProductService } from '../product.service';
import { UserService } from  '../../../shared/services/user/user.service';

import { ImageUploadPreviewService } from "../../../shared/components/image-upload-preview/image-upload-preview.service";
import { S3UploaderService } from "../../../shared/services/s3-upload/s3-upload.service";

import { DeleteVariantDialogComponent } from '../delete-variant-dialog/delete-variant-dialog.component';
import { AddVariantDialogComponent } from '../add-variant-dialog/add-variant-dialog.component';
import { DeleteShippingDialogComponent } from '../delete-shipping-dialog/delete-shipping-dialog.component';
import { EditShippingDialogComponent } from '../edit-shipping-dialog/edit-shipping-dialog.component';
import { AddShippingDialogComponent } from '../add-shipping-dialog/add-shipping-dialog.component';

import 'rxjs/add/operator/toPromise';
import { ToolTipsComponent } from '../tool-tips/tool-tips.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['../product.scss']
})

export class ProductEditComponent implements OnInit, AfterContentChecked {

  step: number = 0;
  status: any = false;

  selectable = true;
  removable = true;

  categoryList: any = [];
  subCategoryList: any;
  thirdCategoryList: any;

  YesOrNo = [{
    text: "Yes",
    value: true
  }, {
    text: 'No',
    value: false
  }];

  variantList:any[] = [];

  attributes:any[];

  attributesList: any = [];

  productBasicForm: FormGroup;
  productAttributeForm: FormGroup;
  productVariantForm: FormGroup;
  productLogisticForm: FormGroup;

  countries: Object[];

  previewImgFile: any;
  previewImgSrcs: any;

  additionalList: any = ['', '', '', '', ''];
  additionalSrcs: any = ['', '', '', '', ''];

  productShippingList: any[];

  public editor;
  public editorImageId = 'quillImage';

  get product() { return this.productVariantForm.get('variants') as FormArray; }
  get specification() { return this.productAttributeForm.get('productSpecification') as FormArray; }

  isSuperUser: boolean = false;

  sub: any;

  parentId: any;
  grandParentId: any;
  categoryId: any;

  isFirstLoad: boolean = false;

  productStatus: any = '';

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
    private userService :UserService,
    private snackBar: MatSnackBar
  ) {

    this.sub = this.userService.currentUser.subscribe((data) => {
      if(data && data.isStaff && data.isSuperuser) {
        this.isSuperUser = true;
      }
    });

    this.productBasicForm = this.fb.group({
      title: [''],
      grandParentId: [null, Validators.required],
      parentId: [null],
      childId: [null],
      brandName: [''],
      description: ['Please add product details and images'],
      productCategoryId: ['', Validators.required],
      purchaseLink: [' ']
    });

    this.productVariantForm = this.fb.group({
      aliasColor: [''],
      aliasSize: [''],
      variants: this.fb.array([]),
    });

    this.productAttributeForm = this.fb.group({
      productSpecification: this.fb.array([]),
    });

    this.productLogisticForm = this.fb.group({
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
      isBattery: [false, Validators.required]
    });

    let id = this.activatedRoute.snapshot.params['id'];

    this.adminService.getAttributeList({
      id
    }).then((data) => {
      this.attributesList = [...data];
    });

    this.adminService.getProductBasic({
      id
    }).then((data) => {
      this.productBasicForm.patchValue({
        title: data.title,
        grandParentId: data.productCategories[0].grandParentId,
        parentId: data.productCategories[0].parentId,
        childId: data.productCategories[0].childId,
        brandName: data.brandName,
        description: data.description,
        productCategoryId: data.productCategories[0].id,
        purchaseLink: data.purchaseLink == null || data.perchaseLink == ''? ' ': data.purchaseLink
      });

      this.parentId = data.productCategories[0].parentId;
      this.grandParentId = data.productCategories[0].grandParentId;
      this.categoryId = data.productCategories[0].childId;

      this.status = data.status;

      this.additionalList = [...data.images];
      this.additionalSrcs = [...data.images];
      for (let i = 0; i < 5 - data.images.length; i++) {
        this.additionalList.push('');
        this.additionalSrcs.push('');
      }

      this.productStatus = data.status;
    });

    this.adminService.getCategoryList().then((value) => {
      this.categoryList = [...value];

    });

    this.adminService.getProductVariantList({
      pid: id
    }).then((data) => {
      this.attributes = data.attributes;
      this.productVariantForm.patchValue({
        aliasColor: data.aliasColor,
        aliasSize: data.aliasSize
      });
      let i = 0;
      for(let item of data.variants) {
        this.addProductList(item);
        i++;
      }
    });

    this.adminService.getProductShipping({
      id
    }).then((data) => {
      this.productShippingList = data.shippingPrices;
    });

    this.adminService.getLogisticShipping({
      id
    }).then((data) => {
      this.productLogisticForm.patchValue({
        length: data.length,
        width: data.width,
        height: data.height,
        weight: data.weight,
        customsDeclaredCharge: data.customsDeclaredCharge,
        originCountryId: data.originCountry?data.originCountry.id: null,
        isPowder: data.isPowder,
        isLiquid: data.isLiquid,
        isBattery: data.isBattery,
        shippingWeight: data.shippingWeight,
        shopName: data.shopName,
        supplierLocation: data.supplierLocation,
        processingTime: data.processingTime,
        minimumQuantity: data.minimumQuantity,
      });
    });

  }

  ngAfterContentChecked() {
    if(this.grandParentId && this.parentId && this.categoryList.length >0
      && !this.isFirstLoad) {
      this.isFirstLoad = true;
      this.categoryChangeNew(this.grandParentId);
      this.subCategoryChangeNew(this.parentId);
      if(this.categoryId) {
        this.thirdCategoryChange(this.categoryId);
      }
    }
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
          type: 'product/detail',
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
        this.productBasicForm.patchValue({
          parentId: null,
          childId: null
        });
      } else {
        this.subCategoryList = false;
        this.thirdCategoryList = false;
        this.productBasicForm.patchValue({
          parentId: null,
          childId: null
        });
      }
    }
    this.specification.controls = [];
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
        this.productBasicForm.patchValue({
          parentId: null,
          childId: null
        });
      }
      this.specification.controls = [];
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
        this.productBasicForm.patchValue({
          childId: null
        });
      } else {
        this.thirdCategoryList = false;
        this.productBasicForm.patchValue({
          parentId: null,
          childId: null
        });
      }
      this.getAttributeDetail($event);
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
        this.productBasicForm.patchValue({
          childId: null
        });
      }
      this.getAttributeDetail($event);
    }
  }

  thirdCategoryChange($event) {
    this.getAttributeDetail($event);
  }

  deleteVariantObject(i) {
    let id = this.product.controls[i].value.id;
    let dialogRef = this.dialog.open(DeleteVariantDialogComponent, {
      data: {
        id: id,
        isDelete: false
      }
    });

    let self = this;
    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isDelete == true) {
        self.product.removeAt(i);
      }
    });
  }

  deleteShippingObject(i) {
    let id = this.productShippingList[i].id;
    let self = this;
    if(id) {
      let dialogRef = this.dialog.open(DeleteShippingDialogComponent, {
        data: {
          id: id,
          isDelete: false
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(dialogRef.componentInstance.data.isDelete == true) {
          self.productShippingList.splice(i, 1);
        }
      });
    } else {
      self.productShippingList.splice(i, 1);
    }
  }

  openEditShippingDialog(i) {
    let item = this.productShippingList[i];
    let dialogRef = this.dialog.open(EditShippingDialogComponent, {
      data: {
        shipping: item,
        countries: this.countries,
        isShippingEdit: false
      }
    });

    let self = this;
    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isShippingEdit == true) {
        this.productShippingList[i] = dialogRef.componentInstance.data.shipping;
      }
    });
  }

  openAddShippingDialog(i) {
    let item = this.productShippingList[i];
    let dialogRef = this.dialog.open(AddShippingDialogComponent, {
      data: {
        shipping: {},
        productId: parseInt(this.activatedRoute.snapshot.params["id"]),
        countries: this.countries,
        isShippingAdd: false
      }
    });

    let self = this;
    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isShippingAdd == true) {
        self.productShippingList.push(dialogRef.componentInstance.data.shipping);
      }
    });
  }

  openVariantDialog() {
    let id = parseInt(this.activatedRoute.snapshot.params["id"]);
    let dialogRef = this.dialog.open(AddVariantDialogComponent, {
      data: {
        variant: {},
        attributes: this.attributes,
        productId: id,
        isVariantAdded: false
      }
    });

    let self = this;
    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isVariantAdded == true) {
        self.addProductList(dialogRef.componentInstance.data.variant);
      }
    });
  }


  addProductList(variant) {
    let attribute = '';
    let index = 0;
    let _attr = this.fb.array([]);
    for(let item of variant.attributeValues) {
      _attr.push(this.fb.group({
        id: [item.id],
        name: [item.name],
        value: [item.value, Validators.required]
      }));
      attribute += index != 0?', ' +item.value.trim():item.value.trim();
      index++;
    }

    this.product.push(this.fb.group({
      id: [variant.id],
      isEdit: [false],
      attributes: [attribute],
      attributeValues: _attr,
      mainImage: [variant.mainImage?variant.mainImage: ''],
      sku: [variant.sku, Validators.required],
      variantStockrecord: [variant.variantStockrecord, Validators.required],
      saleUnitPrice: [variant.saleUnitPrice, Validators.required],
      lowestPrice: [variant.lowestPrice, Validators.required],
      unitPrice: [variant.unitPrice],
      costPrice: [variant.costPrice],
      sourcingPrice:  [variant.sourcingPrice],
    }));

  }

  editVariant(p, i) {
    if(!p.value.isEdit) {
      p.patchValue({
        isEdit: !p.value.isEdit
      });
    } else {
      this.adminService.changeVariant(p.value).then((data) => {
        this.product.removeAt(i);
        let attribute = '';
        let index = 0;
        let _attr = this.fb.array([]);
        for(let item of data.attributeValues) {
          _attr.push(this.fb.group({
            id: [item.id],
            name: [item.name],
            value: [item.value, Validators.required]
          }));
          attribute += index != 0?', ' +item.value.trim():item.value.trim();
          index++;
        }

        this.product.insert(0, this.fb.group({
          id: [data.id],
          isEdit: [false],
          attributes: [attribute],
          attributeValues: _attr,
          mainImage: [data.mainImage ? data.mainImage : ''],
          sku: [data.sku, Validators.required],
          variantStockrecord: [data.variantStockrecord, Validators.required],
          saleUnitPrice: [data.saleUnitPrice, Validators.required],
          lowestPrice: [data.lowestPrice, Validators.required],
          unitPrice: [data.unitPrice],
          costPrice: [data.costPrice],
          sourcingPrice: [data.sourcingPrice],
        }));



      });
    }
  }

  ngOnInit():void {

    this.adminService.getVariantList().then((data) => {
      this.variantList = data;
    });

    this.adminService.getCountryList().then((data) => {
      this.countries = data;
    });

  }

  openLeaveDialog() {
    this.router.navigate(['/admin/product'], { queryParams: {tab:this.status}});
  }

  changeProductBasic() {
    if(this.productBasicForm.invalid) {
      return;
    }
    let product = this.productBasicForm.value;
    product.id = parseInt(this.activatedRoute.snapshot.params["id"]);
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
    this.adminService.changeProductBasic(product).then((data) => {
      this.openSnackBar();
    });
  }

  changeSpecification() {
    if(this.productAttributeForm.invalid) {
      return;
    }
    let product:any = this.productAttributeForm.value;
    product.id = this.activatedRoute.snapshot.params["id"];
    this.adminService.editAttributeList(product).then((data) => {
      this.openSnackBar();
    });
  }

  changeProductLogistic() {
    if(this.productLogisticForm.invalid) {
      return;
    }
    let product = this.productLogisticForm.value;
    product.id = parseInt(this.activatedRoute.snapshot.params["id"]);
    this.adminService.changeLogisticShipping(product).then((data) => {
      this.openSnackBar();
    });
  }


  changeAttributesValue() {
    if(this.productVariantForm.invalid) {
      return;
    }
    let product = this.productVariantForm.value;
    product.id = parseInt(this.activatedRoute.snapshot.params["id"]);
    this.adminService.changeAttributesValue(product).then((data) => {
      this.openSnackBar();
    });
  }

  getAttributeDetail($event) {
    this.adminService.getCategoryAttributeDetail({
      id: $event
    }).then((data) => {
      this.specification.controls = [];
      for(let item of data.specificationList) {
        let content = '';
        let contentList: any = [];
        for(let im of this.attributesList) {
          if(im.name == item.name) {
            content = im.content;
            let arr = im.content.split(',');
            contentList = [...arr];
          }
        }
        this.specification.push(this.fb.group({
          name: [item.name, Validators.required],
          specificationId: [item.specificationId, Validators.required],
          content: [content, Validators.required],
          sort: [item.sort, Validators.required],
          specificationValues: [item.specificationValues?item.specificationValues.split(','):[]],
          contentList: [contentList]
        }));
      }

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

  openSnackBar() {
    this.snackBar.openFromComponent(ToolTipsComponent, {
      data: 'Successfully Saved!',
      duration: 4000,
      verticalPosition: 'top'
    });
  }

  publish() {
    let self = this;
    let id = this.activatedRoute.snapshot.params['id'];

    self.adminService.publishProduct({
      id,
      status: 'published'
    }).then((data) => {
      this.productStatus = 'published';
    });

  }

  unpublish() {
    let self = this;
    let id = this.activatedRoute.snapshot.params['id'];

    self.adminService.publishProduct({
      id,
      status: 'unpublished'
    }).then((data) => {
      this.productStatus = 'unpublished';
    });
  }
}
