import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { AuthService } from 'ngx-auth';

import { BaseApi,SystemConstant } from '../../../config/app.api';

import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class AuthenticationService implements AuthService {

  constructor(
    private http: Http,
    private baseUrl: BaseApi,
    private systemConstant: SystemConstant
  ) {

  }

  public isAuthorized(): Observable<boolean> {
    const isAuthorized: boolean = !!localStorage.getItem('accessToken');

    return Observable.of(isAuthorized);
  }

  public setAccessToken(data: any): void {
    this.logout();
    localStorage.setItem('accessToken', data.access_token);
    localStorage.setItem('refreshToken', data.refresh_token);
    localStorage.setItem('expireDate', new Date().getTime() + (data.expires_in  * 1000) + '');
  }

  public inviteToken(data: any): void {
    if(!data) {
      localStorage.removeItem('inviteToken');
    } else {
      localStorage.setItem('inviteToken', JSON.stringify({isInvite: data}));
    }

  }

  public getAccessToken(): Observable<string> {
    let accessToken: string = localStorage.getItem('accessToken');

    return Observable.of(accessToken);
  }

  public refreshToken(): Observable<any> {
    const refreshToken: string = localStorage.getItem('refreshToken');
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
      })
  }

  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === 401;
  }

  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('refresh-token');
  }

  public getTokenExpireDate(): Observable<string> {
    const expireDate: string = localStorage.getItem('expireDate');
    return Observable.of(expireDate);
  }

  public logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expireDate');
  }

  public getHeaders(token?:string) {
    // set the authorization null of http client
    return {'authorization': ''};
  }
}
