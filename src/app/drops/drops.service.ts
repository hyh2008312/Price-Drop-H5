import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';

import {BaseApi} from '../config/app.api';
import {AuthenticationService} from '../shared/services/authentication/authentication.service';
import {GuardLinkService} from '../shared/services/guard-link/guard-link.service';

@Injectable()
export class DropsService {

  routerLink: any = false;

  constructor(
    private http: Http,
    private baseUrl: BaseApi,
    private auth: AuthenticationService,
    public guardLinkService: GuardLinkService,
    public router: Router
  ) {
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

  getCutDetail(id): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers: headers});

    const url = `${this.baseUrl.url}promotion/cut/detail/${id}/`;
    // const url = `http://47.104.171.91/promotion/cut/detail/${id}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  friendCutPrice(params): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers: headers});

    const url = `${this.baseUrl.url}promotion/cut/friend/${this.serializeParams(params)}/`;
    // const url = `http://47.104.171.91/promotion/cut/friend/${params}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  withDrawMoney(params: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}payment/store/withdrawals/`;

    return this.http.post(url, params, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  checkIsAuth(response) {
    if(response.status == 401) {
      return Promise.reject(401);
    }
    return response.json();
  }

  private handleError(error: Response | any, target?: any) {
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
    } else {
      errMsg = error.msg ? error.msg : error.toString();
    }
    return Promise.reject(errMsg);
  }

}
