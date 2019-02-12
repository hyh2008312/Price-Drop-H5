import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions } from '@angular/http';
import {Router} from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { BaseApi } from '../../config/app.api';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';

@Injectable()
export class OrderService {

  constructor( private http: Http, private baseUrl: BaseApi, private auth: AuthenticationService,
               public router: Router) {

  }

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

  getSupplyOrderList(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}purchase/order/list/?${this.serializeParams(params)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getSupplyOrderRecommendList(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}purchase/order/new/list/?${this.serializeParams(params)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getSkuInventoryList(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}purchase/order/inventory/list/`;

    return this.http.post(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getOrderNumberCost(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}purchase/order/tariffs/calculate/?${this.serializeParams(params)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }


  getSupplyOrderDetail(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}order/supplier/${params.id}/detail/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getReturnOrderDetail(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}order/supplier/review/return/${params.id}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getSupplyOrderResult(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}order/supplier/number/detail/?${this.serializeParams(params)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getSupplyOrderPackingResult(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}order/supplier/query/?${this.serializeParams(params)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getSupplyShippingList(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}shipping/list/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  changeTrackingInformation(tracking:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}order/shipping/number/${tracking.id}/`;

    return this.http.put(url, tracking, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  changeGATITrackingInformation(tracking:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}purchase/create/gati/shipping/`;

    return this.http.put(url, tracking, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  cancelOrder(order:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}order/supplier/cancel/${order.id}/`;

    return this.http.put(url, order, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }


  auditCancelOrder(order:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}order/supplier/audit/${order.id}/`;

    return this.http.put(url, order, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  denyReturnOrderRequest(order:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}order/supplier/return/${order.id}/?${this.serializeParams(order)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  authorizeReturnOrderRequest(order:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}order/supplier/return/${order.id}/`;

    return this.http.put(url, order, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  refund(order:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}payment/supplier/paytm/refund/`;

    return this.http.post(url, order, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  changeOrderPaid(order:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}order/supplier/update/${order.id}/`;

    return this.http.post(url, order, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  changeShippingMethod(order:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}order/supplier/resent/${order.id}/`;

    return this.http.put(url, order, options)
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

  getStateList(country:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}address/state/${country.cid}/list/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getSourcingSupplierList(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    // this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}order/sourcing/supplier/list/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  changeOrderSourcing(params:any): Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}order/sourcing/supplier/update/${params.id}/`;

    return this.http.post(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  editOrderOutStock(params:any): Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}order/sourcing/change/${params.id}/`;

    return this.http.post(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  changeOrderStockInformation(params: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}order/shipping/number/${params.id}/`;

    return this.http.put(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  addOrderNotes(params: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}order/supplier/notes/${params.id}/`;

    return this.http.post(url, params, options)
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

  getWarehouseList() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}purchase/warehouse/list/`;

    return this.http.get(url, options)
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
