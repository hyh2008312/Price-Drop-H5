import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Router} from '@angular/router';

import { BaseApi } from '../../config/app.api';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';

@Injectable()
export class LotteryService {

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

  getPrizeList(params: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/draw/list/?${this.serializeParams(params)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getCampaignList(params: any): Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}lottery/list/?${this.serializeParams(params)}`;

    return this.http.get(url, options)
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

  getCardList(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}point/supplier/voucher/list/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getCategory(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/supplier/category/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  getNewCategory(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/supplier/new/category/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  productCreate(product:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/lottery/create/`;

    return this.http.post(url, product, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getPrizeDetail(product:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/lottery/detail/${product.id}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  changePrizeDetail(product: any): Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/lottery/basic/update/${product.id}/`;

    return this.http.put(url, product, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }


  deletePrize(product:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/lottery/detail/${product.id}/`;

    return this.http.delete(url, options)
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


  deletePromotion(promotion:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}lottery/down/${promotion.id}/`;

    return this.http.post(url, promotion, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  promotionCreate(promotion:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}lottery/create/`;

    return this.http.post(url, promotion, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getParticipantList(params: any): Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}lottery/get/new/award/?${this.serializeParams(params)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getWinnerList(params: any): Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}lottery/get/prize/list/?${this.serializeParams(params)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getPromotionDetail(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}lottery/detail/${params.id}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  changePromotionDetail(params:any): Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}lottery/update/${params.id}/`;

    return this.http.post(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  changePromotionPrize(promotion:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}lottery/prize/update/${promotion.id}/`;

    return this.http.post(url, promotion, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  addPromotionProduct(promotion:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}lottery/products/add/${promotion.promoteId}/`;

    return this.http.put(url, promotion, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  addParticipant(user: any): Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}lottery/update/award/${user.id}/`;

    return this.http.post(url, user, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  deleteParticipant(user: any): Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}lottery/update/award/${user.id}/`;

    return this.http.put(url, user, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  setPrizeWinner(promote: any): Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers: headers});

    const url = `${this.baseUrl.url}lottery/set/award/${promote.id}/`;

    return this.http.post(url, promote, options)
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

    const url = `${this.baseUrl.url}order/lottery/shipping/number/${tracking.id}/`;

    return this.http.put(url, tracking, options)
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

  getSupplyPromoteResult(params: any): Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}lottery/draw/search/user/?${this.serializeParams(params)}`;

    return this.http.get(url, options)
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
