import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Router} from '@angular/router';

import { BaseApi } from '../../config/app.api';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';

@Injectable()
export class ProductService {

  constructor( private http: Http, private baseUrl: BaseApi, private auth: AuthenticationService,
               public router: Router) { }

  createAuthorizationHeader(headers: Headers) {

    this.auth.getAccessToken().subscribe((data) => {
      if(data) {
        headers.append('Authorization', 'Bearer ' + data);
      }
    });

  }

  serializeParams(params) {

    let array = [];

    for (const key in params) {
      if(Array.isArray(params[key])) {
        if(params[key].length > 0) {
          let item = params[key].join(',');
          array.push(key + '=' + item);
        }
      } else {
        if(params[key] != undefined) {
          array.push(key + '=' + params[key]);
        }
      }
    }

    return array.join('&');
  }

  productCreate(product:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/create/`;

    return this.http.post(url, product, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  productDraftCreate(product:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/draft/create/`;

    return this.http.post(url, product, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  addProduct(product:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/add/${product.id}/`;

    return this.http.put(url, product, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  publishDraft(product:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/draft/submit/${product.id}/`;

    return this.http.put(url, product, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  saveDraft(product:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/draft/save/${product.id}/`;

    return this.http.put(url, product, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  addDraft(product:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/draft/add/${product.id}/`;

    return this.http.put(url, product, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  publishProduct(product:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/updown/${product.id}/?${this.serializeParams(product)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  publishProducts(product:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/update/state/`;

    return this.http.post(url, product, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  disapproveProduct(product:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/disapprove/${product.id}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  addProductToSelected(product:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/selected/create/`;

    return this.http.post(url, product, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  deleteProductToSelected(product:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/selected/delete/product/${product.id}/`;

    return this.http.delete(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getProductList(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/supplier/list/?${this.serializeParams(params)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getSelectedProductList(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/selected/list/?${this.serializeParams(params)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getDropsProductList(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/supplier/cut/list/?${this.serializeParams(params)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  changeDrop(params: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/cut/add/${params.id}/`;

    return this.http.put(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getProductDetail(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/supplier/detail/${params.id}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getVariantList(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/attribute/list/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  createVariantKey(attribute: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/attribute/create/`;

    return this.http.post(url, attribute, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getProductBasic(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/basic/update/${params.id}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  changeProductBasic(params: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/basic/update/${params.id}/`;

    return this.http.put(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getProductCommission(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/commission/update/${params.id}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  changeProductCommission(params: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/commission/update/${params.id}/`;

    return this.http.put(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getProductShipping(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/shipping/update/${params.id}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  changeProductShipping(params: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/shipping/update/${params.id}/`;

    return this.http.put(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getLogisticShipping(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/logistic/update/${params.id}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  changeLogisticShipping(params: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/logistic/update/${params.id}/`;

    return this.http.put(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  changeAttributesValue(params: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/update/variant/alias/${params.id}/`;

    return this.http.put(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getShippingList(country: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}shipping/${country}/list/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  addShipping(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/shipping/update/${params.id}/`;

    return this.http.put(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getProductVariantList(params: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/variants/update/?${this.serializeParams(params)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  addNewVariant(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/variants/update/`;

    return this.http.post(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  changeVariant(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/variant/change/${params.id}/`;

    return this.http.put(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  changeAttributes(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/basic/update/detail/${params.id}/`;

    return this.http.post(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  deleteVariant(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/variant/change/${params.id}/`;

    return this.http.delete(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  deleteShipping(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/shipping/detail/${params.id}/`;

    return this.http.delete(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  editShipping(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/shipping/detail/${params.id}/`;

    return this.http.put(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getCategoryList(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/supplier/new/category/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getCountryList(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}address/country/list/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getCategoryAttributeDetail(params: any): Promise<any>  {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/category/specification/list/${params.id}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  uploadEditedProduct(params: any): Promise<any>  {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/batch/upload/`;

    return this.http.post(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  uploadCreatedProduct(params: any): Promise<any>  {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/new/create/`;

    return this.http.post(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getAttributeList(params: any): Promise<any>  {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/update/specification/${params.id}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  editAttributeList(params: any): Promise<any>  {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/update/specification/${params.id}/`;

    return this.http.put(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  private handleError (error: Response | any, target?: any) {
    let errMsg: string;
    if (error instanceof Response) {
      if(error.status == 401) {
        if(target) {
          target.router.navigate(['/account/login']);
        }
        return Promise.reject(401);
      }
      const body = error.json() || '';
      const err = body.error || body;
      if(err.detail) {
        errMsg = `${err.detail}`;
      } else {
        if(err.error) {
          errMsg = "Sorry! Server is busy now!";
        }
      }
    } else {
      errMsg = error.msg ? error.msg : error.toString();
    }
    return Promise.reject(errMsg);
  }

}
