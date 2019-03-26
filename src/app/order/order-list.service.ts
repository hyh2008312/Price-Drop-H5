import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';

import {BaseApi} from '../config/app.api';
import {AuthenticationService} from '../shared/services/authentication/authentication.service';
import {GuardLinkService} from '../shared/services/guard-link/guard-link.service';
import { Title, Meta } from '@angular/platform-browser';

@Injectable()
export class OrderListService {

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

  getDefaultAddress(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers)
    let url = `${this.baseUrl.h5Url}address/get/default/`;
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError1);
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
      .catch(this.handleError1);
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
      .catch(this.handleError1);
  }
  getBalance(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers)
    let url = `${this.baseUrl.h5Url}point/cashing/amount/`;
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
    this.createAuthorizationHeader(headers)
    let url = `${this.baseUrl.h5Url}order/customer/list/?${this.serializeParams(parmas)}`;
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError1);
  }
  postDirectOrder(params: any){
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers)
    let url = `${this.baseUrl.h5Url}order/create/pure/`;
    let options = new RequestOptions({headers: headers});
    return this.http.post(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError1);
  }
  // getState () {
  //   this.$fetch({
  //     method: 'GET', // 大写
  //     name: 'address.state.list',
  //     data: {}
  //   }).then(data => {
  //     this.$storage.set('state', data);
  //   }, error => {})
  // },
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
