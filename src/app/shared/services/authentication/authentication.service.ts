import { Injectable, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import 'rxjs/add/operator/toPromise';
import { AuthService } from 'ngx-auth';

import { BaseApi,SystemConstant } from '../../../config/app.api';

import { AppStorage } from '../../../shared-server/for-storage/universal.inject';

import { GuardLinkService } from '../guard-link/guard-link.service';

@Injectable()
export class AuthenticationService implements AuthService {

  constructor(
    private http: Http,
    private baseUrl: BaseApi,
    private systemConstant: SystemConstant,
    @Inject(AppStorage) private appStorage,
    private guardLinkService: GuardLinkService
  ) {

  }

  public isAuthorized(): Observable<boolean> {
    const isAuthorized: boolean = !!this.appStorage.getItem('accessToken');

    if(!isAuthorized) {
      this.guardLinkService.addRouterLink(window.location.pathname);
    } else {
      this.guardLinkService.addRouterLink(false);
    }

    return Observable.of(isAuthorized);
  }

  public isOnlyAuthorized(): Observable<boolean> {
    const isAuthorized: boolean = !!this.appStorage.getItem('accessToken');

    return Observable.of(isAuthorized);
  }

  public setAccessToken(data: any): void {
    this.logout();
    this.appStorage.setItem('accessToken', data.access_token, new Date(new Date().getTime() + (data.expires_in  * 1000)));
    this.appStorage.setItem('refreshToken', data.refresh_token, new Date(new Date().getTime() + (data.expires_in  * 1000)));
    this.appStorage.setItem('expireDate', new Date().getTime() + (data.expires_in  * 1000) + '', new Date(new Date().getTime() + (data.expires_in  * 1000)));
  }

  public inviteToken(data: any): void {
    if(!data) {
      this.appStorage.removeItem('inviteToken');
    } else {
      this.appStorage.setItem('inviteToken', JSON.stringify({isInvite: data}));
    }

  }

  public getAccessToken(): Observable<string> {
    let accessToken: string = this.appStorage.getItem('accessToken');

    return Observable.of(accessToken);
  }

  public refreshToken(): Observable<any> {
    const refreshToken: string = this.appStorage.getItem('refreshToken');
    const url = `${this.baseUrl.url}oauth2/convert-token/`;
    const token: Object = {
      grant_type: 'convert_token',
      client_id: this.systemConstant.clientId,
      token: refreshToken
    };

    let self = this;
    return this.http.post(url, token)
      .catch((error: any) => {
        self.logout();
        return Observable.throw(error.statusText);
      });
  }

  public logoutOfServer(): Promise<any>{
    const url = `${this.baseUrl.url}oauth2/revoke_token/`;
    const token: string = this.appStorage.getItem('accessToken');
    const params: Object = {
      client_id: this.systemConstant.clientId,
      token: token
    };

    let self = this;
    return this.http.post(url, params)
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === 401;
  }

  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('refresh-token');
  }

  public getTokenExpireDate(): Observable<string> {
    const expireDate: string = this.appStorage.getItem('expireDate');
    return Observable.of(expireDate);
  }

  public logout(): void {
    this.appStorage.removeItem('accessToken');
    this.appStorage.removeItem('refreshToken');
    this.appStorage.removeItem('expireDate');
  }

  public getHeaders(token?:string) {
    // set the authorization null of http client
    return {'authorization': ''};
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      if(error.status == 401) {
        errMsg = 'Your email or password is incorrect. Please try again!';
      } else {
        const body = error.json() || '';
        const err = body.error || body;
        if(err.detail) {
          errMsg = `${err.detail}`;
        } else {
          if(err.error) {
            errMsg = "Sorry! Server is busy now!";
          }
        }
      }
    } else {
      errMsg = error.msg ? error.msg : error.toString();
    }
    return Promise.reject(errMsg);
  }

}
