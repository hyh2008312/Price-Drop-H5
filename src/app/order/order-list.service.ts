import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';

import {BaseApi, PAYTMMID} from '../config/app.api';
import {AuthenticationService} from '../shared/services/authentication/authentication.service';
import {GuardLinkService} from '../shared/services/guard-link/guard-link.service';
import { Title, Meta } from '@angular/platform-browser';
import {BehaviorSubject, Subject} from 'rxjs/Rx';

@Injectable()
export class OrderListService {
  state: Subject<any> = new BehaviorSubject<any>(null);
  defaultState: Subject<any> = new BehaviorSubject<any>(null);
  public addState(state: any): void {
    this.state.next(state);
  }
  public adddefaultState(defaultState: any): void {
    this.defaultState.next(defaultState);
  }
  routerLink: any = false;

  constructor(
    private http: Http,
    private baseUrl: BaseApi,
    private auth: AuthenticationService,
    public guardLinkService: GuardLinkService,
    public titleService: Title,
    public metaService: Meta,
    public router: Router
  ) {
  }
  addTitleDescription(data:any) {
    this.titleService.setTitle(data.title);

    this.metaService.updateTag({name: 'description', content: data.description});
    this.metaService.updateTag({property: "og:title", content: data.title});
    this.metaService.updateTag({property: "og:dec-return", content: data.description});
    this.metaService.updateTag({property: "og:image", content: data.shareImage});
    this.metaService.updateTag({property: "og:image:width", content: '600'});
    this.metaService.updateTag({property: "og:image:height", content: '600'});
    this.metaService.updateTag({property: "og:url", content: window.location.href});
  }

  createAuthorizationHeader(headers: Headers) {

    this.auth.getAccessToken().subscribe((data) => {
      if (data) {
        headers.append('Authorization', 'Bearer ' + data);
      }
    });

  }

  serializeParams(params) {

    let array = [];

    for (const key in params) {
      if (Array.isArray(params[key])) {
        if (params[key].length > 0) {
          let item = params[key].join(',');
          array.push(key + '=' + item);
        }
      } else {
        if (params[key] != undefined) {
          array.push(key + '=' + params[key]);
        }
      }
    }

    return array.join('&');
  }

  getAddressList(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let url = `${this.baseUrl.h5Url}address/shipping/list/`;
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((res)=>this.handleError(res, this));
  }
  editDefaultAddress(id): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let url = `${this.baseUrl.h5Url}address/set/default/${id}/`;
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((res)=>this.handleError(res, this));
  }
  getDefaultAddress(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let url = `${this.baseUrl.h5Url}address/get/default/`;
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((res)=>this.handleError(res, this));
  }

  getNotification(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let url = `${this.baseUrl.h5Url}notice/app/list/?placement=Order Confirm`;
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((res)=>this.handleError(res, this));
  }
  getCityList(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let url = `${this.baseUrl.h5Url}address/state/list/`;
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((res)=>this.handleError(res, this));
  }
  getBalance(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let url = `${this.baseUrl.h5Url}point/cashing/amount/`;
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((res)=>this.handleError(res, this));
  }
  getOrder(id): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers)
    let url = `${this.baseUrl.h5Url}order/customer/detail/${id}/`;
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError1);
  }
  getOrderList(parmas): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let url = `${this.baseUrl.h5Url}order/customer/list/?${this.serializeParams(parmas)}`;
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((res)=>this.handleError(res, this));
  }
  cancelOrder(id, params) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let url = `${this.baseUrl.h5Url}order/customer/cancel/${id}/`;
    let options = new RequestOptions({headers: headers});
    return this.http.put(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError1);
  }
  postDirectOrder(params: any){
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let url = `${this.baseUrl.h5Url}order/create/pure/`;
    let options = new RequestOptions({headers: headers});
    return this.http.post(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError1);
  }
  postFlashOrder(params: any){
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let url = `${this.baseUrl.h5Url}order/flash/pure/`;
    let options = new RequestOptions({headers: headers});
    return this.http.post(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError1);
  }
  paymentCOD(params: any){
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let url = `${this.baseUrl.h5Url}order/cod/create/`;
    let options = new RequestOptions({headers: headers});
    return this.http.post(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError1);
  }
  postAddress(params: any){
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let url = `${this.baseUrl.h5Url}address/shipping/list/`;
    let options = new RequestOptions({headers: headers});
    return this.http.post(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError1);
  }
  editAddress(id, params: any){
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let url = `${this.baseUrl.h5Url}address/shipping/detail/${id}/`;
    let options = new RequestOptions({headers: headers});
    return this.http.put(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError1);
  }
  delOrder(id){
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let url = `${this.baseUrl.h5Url}order/customer/cancel/${id}/`;
    let options = new RequestOptions({headers: headers});
    return this.http.delete(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError1);
  }
  delAddress(id){
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let url = `${this.baseUrl.h5Url}address/shipping/detail/${id}/`;
    let options = new RequestOptions({headers: headers});
    return this.http.delete(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError1);
  }
  getGATIOrderTracking(id): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let url = `${this.baseUrl.h5Url}/order/gati/shipping/${id}/`;

    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((res)=>this.handleError(res, this));
  }
  getOrderTracking(id): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    // this.createAuthorizationHeader(headers);

    // let url = `${this.baseUrl.h5Url}order/tracking/shipping/${id}/`;
    let url = `http://149.129.135.114/order/tracking/shipping/12115/`;

    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((res)=>this.handleError(res, this));
  }

  getRazorpay(params): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let url = `${this.baseUrl.h5Url}payment/razorpay/create/?${this.serializeParams(params)}`;

    let options = new RequestOptions({headers: headers});
    return this.http.post(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch((res)=>this.handleError(res, this));
  }

  checkRazorpay(params): Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let url = `${this.baseUrl.h5Url}order/create/pure/`;
    let options = new RequestOptions({headers: headers});
    return this.http.post(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch((res)=>this.handleError(res, this));
  }

  createPaytm(postParams: any): Promise<any> {

    let formData = new FormData();


    formData.append('MID', PAYTMMID);
    formData.append('WEBSITE', 'APPPROD');
    formData.append('ORDER_ID', postParams['paytmOrderId']);
    formData.append('CUST_ID', postParams['orderNumber']);
    formData.append('MOBILE_NO',  postParams['order']['phoneNumber']);
    formData.append('EMAIL',  postParams['order']['ownerEmail']);
    formData.append('INDUSTRY_TYPE_ID',  'Retail109');
    formData.append('CHANNEL_ID', 'WEB');
    formData.append('TXN_AMOUNT', postParams['amount']);
    formData.append('CALLBACK_URL',  window.location.href);
    formData.append('CHECKSUMHASH',  postParams['paytmChecksum']);


    let url = `https://securegw.paytm.in/theia/processTransaction`;

    return this.http.post(url, formData)
      .toPromise()
      .then(response => response.json())
      .catch((res)=>this.handleError(res, this));
  }

  private handleError(error: Response | any, target?: any, option?:any) {
    let errMsg: string;

    if (error instanceof Response) {
      if(error.status == 401) {
        if(target) {
          if(!target.routerLink) {
            target.routerLink = window.location.pathname;
            target.guardLinkService.addRouterLink(target.routerLink);
          }
          target.router.navigate(['/account/login']);
          return Promise.reject(401);
        }
      }
      const body = error.json() || '';
      const err = body.error || body;
      if (err.detail) {
        errMsg = `${err.detail}`;
      } else {
        if (err.error) {
          errMsg = 'Sorry! Server is busy now!';
        }
      }

      if(error.status == 409) {
        return Promise.reject(errMsg);
      }
    } else {
      errMsg = error.msg ? error.msg : error.toString();
    }
    return Promise.reject(errMsg);
  }

  private handleError1(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || body;
      if (err.detail) {
        errMsg = `${err.detail}`;
      } else {
        if (err.error) {
          errMsg = 'Sorry! Server is busy now!';
        }
      }
    } else {
      errMsg = error.msg ? error.msg : error.toString();
    }
    return Promise.reject(errMsg);
  }

}
