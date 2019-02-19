import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';

import {BaseApi} from '../config/app.api';
import {AuthenticationService} from '../shared/services/authentication/authentication.service';
import {GuardLinkService} from '../shared/services/guard-link/guard-link.service';
import { Title, Meta } from '@angular/platform-browser';

@Injectable()
export class DropsService {

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
    this.metaService.updateTag({property: "og:description", content: data.description});
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

  getDropDetail(id): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({headers: headers});

    const url = `${this.baseUrl.h5Url}/drops/detail/${id}/`
    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {this.handleError(error, this)});
  }
  getSomeGoods(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({headers: headers});

    const url = `${this.baseUrl.h5Url}/drops/hot/push/`
    return this.http.post(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {this.handleError(error, this)});
  }
  checkIsAuth(response) {
    if(response.status == 401) {
      return Promise.reject(401);
    }
    return response.json();
  }

  private handleError(error: Response | any, target?: any, option?:any) {
    let errMsg: string;
    if (error instanceof Response) {
      if(error.status == 401) {}
      if(error.status == 409) {
        window.location.href = 'http://www.getpricedrop.com';
        return Promise.reject(409);
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
