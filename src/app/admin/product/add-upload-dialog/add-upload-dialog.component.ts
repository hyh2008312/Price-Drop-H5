import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { utils, read, WorkBook, WorkSheet } from 'xlsx';
import { ProductService } from '../product.service';
import { ActivatedRoute} from '@angular/router';
import { InMemoryDataService } from './excel-image';

@Component({
  selector: 'app-product-add-upload-dialog',
  templateUrl: './add-upload-dialog.component.html',
  styleUrls: ['../product.scss']
})

export class AddUploadDialogComponent implements OnInit {

  newData: any;

  specificationList: any;

  error: any = false;

  constructor(
    public dialogRef: MatDialogRef<AddUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: ProductService,
    private activatedRoute: ActivatedRoute,
    private InMemoryDataService: InMemoryDataService
  ) {

  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: WorkBook = read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.newData = <any[][]>(utils.sheet_to_json(ws, {header: 1}));

      const nameList = wsname.split('-');
      const id = nameList[nameList.length - 1];
      this.getProductDetail(id);

    };
    reader.readAsBinaryString(target.files[0]);
  }

  getProductDetail(id) {

    this.adminService.getCategoryAttributeDetail({
      id
    }).then((data) => {
      this.specificationList = [...data.specificationList];

      let excelObject: any = {};

      for(let i = 0; i < this.newData.length; i++) {
        const item = this.newData[i];
        if(i == 0) {
          let specIndex = 19;
          for(let itm of this.specificationList) {
            if(itm.specificationCount > 0) {
              for(let j = 0; j < itm.specificationCount; j++) {

                if(item[specIndex + j] != itm.name) {
                  return this.error = 'Template is not the newest, please update you template!';
                }
              }
              specIndex += itm.specificationCount;
            } else {
              if(item[specIndex] != itm.name) {
                return this.error = 'Template is not the newest, please update you template!';
              }
              specIndex++;
            }
          }
        } else {
          if(item[1] != '') {
            if(!excelObject[item[1]]) {
              excelObject[item[1]] = {};
            }
            excelObject[item[1]].id = item[1] || '';
            excelObject[item[1]].spu = item[2] || '';
            excelObject[item[1]].title = item[14] || '';
            excelObject[item[1]].chineseTitle = item[13] || '';
            excelObject[item[1]].shippingWeight = item[item.length - 17] || '';
            excelObject[item[1]].processingTime = item[item.length - 3] || '';
            excelObject[item[1]].supplierLocation = item[item.length - 1] || '';
            excelObject[item[1]].minimumQuantity = item[item.length - 2] || '';
            excelObject[item[1]].width = item[item.length - 15] || '';
            excelObject[item[1]].length = item[item.length - 16] || '';
            excelObject[item[1]].height = item[item.length - 14] || '';
            excelObject[item[1]].weight = item[item.length - 18] || '';
            excelObject[item[1]].shopName = item[item.length - 5] || '';
            excelObject[item[1]].supplierId = item[item.length - 6] || '';
            excelObject[item[1]].purchaseLink = item[item.length - 4] || '';
            excelObject[item[1]].isBattery = item[item.length - 13] == 'N' ? false: true;
            excelObject[item[1]].code = item[item.length - 7] || '';

            if(!excelObject[item[1]].variants) {
              excelObject[item[1]].variants = [];
            }

            let variant: any = {
              attributeValues: [],
              id: item[4],
              sku: item[5],
              unitPrice: item[18],
              stock: item[10],
              costPrice: item[16],
              saleUnitPrice: item[17],
              sourcingPrice: item[15]
            };

            if(item[6]) {
              variant.attributeValues.push({
                name: item[6]?item[6]:'',
                value: item[7]?item[7]:'',
                attributeId: 1
              });
            }
            if(item[8]) {
              variant.attributeValues.push({
                name: item[8]?item[8]:'',
                value: item[9]? item[9]: '',
                attributeId: 2
              });
            }

            excelObject[item[1]].variants.push(variant);

            if(!excelObject[item[1]].productSpecification) {
              excelObject[item[1]].productSpecification = [];
              let index = 19;
              for(let itm of this.specificationList) {
                let specification: any = {};
                specification.name = itm.name;
                let content = '';
                for(let j = 0; j < itm.specificationCount; j++) {
                  if(item[index] != '') {
                    if(j == 0) {
                      content += item[index];
                    } else {
                      content += ',' + item[index];
                    }
                  }
                  index++;
                }
                specification.content = content;
                specification.sort = itm.sort;
                specification.specificationId = itm.specificationId;
                excelObject[item[1]].productSpecification.push(specification);
              }

            }

            excelObject[item[1]].shipping = {};
            excelObject[item[1]].shipping.id = item[item.length - 12];
            excelObject[item[1]].shipping.priceItem = item[item.length - 8];
            excelObject[item[1]].shipping.shippingTimeMin = item[item.length - 10];
            excelObject[item[1]].shipping.shippingTimeMax = item[item.length - 9];
            excelObject[item[1]].shipping.shippingName = item[item.length - 11];
          }
        }
      }

      let excel: any = [];
      for(let item in excelObject) {
        excel.push(excelObject[item]);
      }

      this.adminService.uploadEditedProduct({product: excel}).then(() => {
        this.data.isUpload = true;
        this.close();
      });

    });
  }

  index: any = 0;

  idx: any = 0;

  onFileChange1(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: WorkBook = read(bstr, {type: 'binary'});

      let length = wb.SheetNames.length;

      this.getProductDetail1(this.index, length, wb);

    };
    reader.readAsBinaryString(target.files[0]);
  }

  getProductDetail1(index, length, wb) {

    if(index < length - 1) {
      const wsname: string = wb.SheetNames[index];
      const ws: WorkSheet = wb.Sheets[wsname];

      /* save data */
      const fileData = <any[][]>(utils.sheet_to_json(ws, {header: 1}));

      const nameList = wsname.split('-');
      const id = nameList[nameList.length - 1];

      this.adminService.getCategoryAttributeDetail({
        id
      }).then((data) => {
        this.specificationList = [...data.specificationList];

        let excelObject: any = {};

        for(let i = 0; i < fileData.length; i++) {
          const item = fileData[i];
          if(i == 0) {

          } else {
            if(item[0] != '') {
              if(!excelObject[item[0]]) {
                excelObject[item[0]] = {};
                excelObject[item[0]].attributes = [{
                  name: 'Size',
                  id: 1,
                  images: [],
                  value: []
                }];

                excelObject[item[0]].variants = [];
              }
              excelObject[item[0]].spu = item[0].toString() || '';
              excelObject[item[0]].title = item[14] || '';
              excelObject[item[0]].categoryId = parseInt(id) || '';
              excelObject[item[0]].description = `<p>${item[13]}</p>` || '';
              excelObject[item[0]].brandName = '';
              excelObject[item[0]].aliasSize = '';
              excelObject[item[0]].aliasColor = '';

              excelObject[item[0]].shippings = [{
                countryId: 2,
                type: 'Free',
                id: 18,
                price: 0,
                shippingTimeMin: 3,
                shippingTimeMax: 5
              }];

              excelObject[item[0]].images = [];
              if(item[17] && item[17] != '') {
                let image: any = item[17];
                for(let em of this.InMemoryDataService.a()) {
                  if(em[item[17]]) {
                    image = em[item[17]];
                  }
                }
                excelObject[item[0]].images.push(image.trim());
              }
              if(item[18] && item[18] != '') {
                let image: any = item[18];
                for(let em of this.InMemoryDataService.a()) {
                  if(em[item[18]]) {
                    image = em[item[18]];
                  }
                }
                excelObject[item[0]].images.push(image.trim());
              }
              if(item[19] && item[19] != '') {
                let image: any = item[19];
                for(let em of this.InMemoryDataService.a()) {
                  if(em[item[19]]) {
                    image = em[item[19]];
                  }
                }
                excelObject[item[0]].images.push(image.trim());
              }
              if(item[20] && item[20] != '') {
                let image: any = item[20];
                for(let em of this.InMemoryDataService.a()) {
                  if(em[item[20]]) {
                    image = em[item[20]];
                  }
                }
                excelObject[item[0]].images.push(image.trim());
              }
              if(item[21] && item[21] != '') {
                let image: any = item[21];
                for(let em of this.InMemoryDataService.a()) {
                  if(em[item[21]]) {
                    image = em[item[21]];
                  }
                }
                excelObject[item[0]].images.push(image.trim());
              }

              excelObject[item[0]].attributes[0].value.push({
                id: 1,
                value: item[2]
              });

              let mainImage: any = item[17];
              for(let em of this.InMemoryDataService.a()) {
                if(em[item[17]]) {
                  mainImage = em[item[17]];
                }
              }

              let variant: any = {
                mainImage: mainImage.trim(),
                attributes: [],
                sku: item[1],
                unitPrice: parseInt(item[23]),
                stock: 100000,
                costPrice: parseInt(item[23]),
                saleUnitPrice: parseInt(item[22]),
                sourcingPrice: parseInt(item[23]),
                lowestPrice: 0
              };

              if(item[2]) {
                variant.attributes.push({
                  name: 'size',
                  value: item[2],
                  attributeId: 1
                });
              }

              excelObject[item[0]].variants.push(variant);

              if(!excelObject[item[0]].specification) {
                excelObject[item[0]].specification = [];
                for(let itm of this.specificationList) {
                  let specification: any = {};
                  specification.name = itm.name;
                  specification.content = '';

                  if(itm.name == 'Brand') {
                    specification.content = item[4];
                  }

                  if(itm.name == 'Season') {
                    specification.content = item[5];
                  }

                  if(itm.name == 'Gender') {
                    specification.content = item[6];
                  }

                  if(itm.name == 'Pants Fabric') {
                    const _item = item[9].split(' ');
                    let content = '';
                    for(let j = 0; j < _item.length; j++) {
                      if(_item[j] != '') {
                        if(j == 0) {
                          content += _item[j];
                        } else {
                          content += ',' + _item[j];
                        }
                      }
                    }
                    specification.content = content;
                  }

                  if(itm.name == 'Pants Length') {
                    specification.content = item[10];
                  }

                  if(itm.name == 'Pants Occasion') {
                    specification.content = item[11];
                  }

                  if(itm.name == 'Pants Occasion') {
                    specification.content = item[11];
                  }

                  specification.sort = itm.sort;
                  specification.specificationId = itm.specificationId;
                  excelObject[item[0]].specification.push(specification);
                }
              }

              excelObject[item[0]].shippingWeight = 0;
              excelObject[item[0]].processingTime = '5-7';
              excelObject[item[0]].supplierLocation = '';
              excelObject[item[0]].minimumQuantity = 1;
              excelObject[item[0]].width = 0;
              excelObject[item[0]].length = 0;
              excelObject[item[0]].height = 0;
              excelObject[item[0]].weight = 0;
              excelObject[item[0]].shopName = 'Estrolo';
              excelObject[item[0]].isBattery = false;
              excelObject[item[0]].isLiquid = false;
              excelObject[item[0]].isPowder = false;
              excelObject[item[0]].originCountryId = 2;
              excelObject[item[0]].customsDeclaredCharge = 0;
              excelObject[item[0]].supplierId = 1;
            }
          }
        }

        let excel: any = [];
        for(let item in excelObject) {
          excel.push(excelObject[item]);
        }

        let len = excel.length - 1;

        this.uploadCreatedProduct(this.idx, excel, len, index, length, wb);

      });
    }

  }

  uploadCreatedProduct(index, excel, length, idx, len, wb) {
    if(index < length - 1) {
      this.adminService.uploadCreatedProduct(excel[index]).then((data) => {
        if(data && data.id) {
          index++;
          this.idx = index;
          this.uploadCreatedProduct(index, excel, length, idx, len, wb);
        } else {
          index++;
          this.idx = index;
          this.uploadCreatedProduct(index, excel, length, idx, len, wb);
        }
      });
    } else {
      idx++;
      this.index = idx;
      this.getProductDetail1(idx, len, wb);
    }
  }
}
