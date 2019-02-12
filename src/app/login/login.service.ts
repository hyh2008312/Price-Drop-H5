import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Login, SignUp, Store } from './login';

import { BaseApi, SystemConstant } from '../config/app.api';
import { AuthenticationService } from '../shared/services/authentication/authentication.service';

@Injectable()
export class LoginService {

  constructor(
    private http: Http,
    private baseUrl: BaseApi,
    private systemConstant: SystemConstant,
    private auth: AuthenticationService
  ) { }

  createAuthorizationHeader(headers: Headers) {

    this.auth.getAccessToken().subscribe((data) => {
      if(data) {
        headers.append('Authorization', 'Bearer ' + data);
      }
    });

  }

  login(token:any): Promise<Login> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}oauth2/token/`;

    token.client_id = this.systemConstant.clientId;
    token.grant_type = "password";

    return this.http.post(url, token, options)
      .toPromise()
      .then(response => response.json() as Login)
      .catch(this.handleError);
  }

  googleLogin(token:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}user/google_sign/`;

    token.client_id = this.systemConstant.clientId;

    return this.http.post(url, token, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  facebookLogin(token:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}user/facebook_sign/`;

    token.client_id = this.systemConstant.clientId;

    return this.http.post(url, token, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  signUp(object: any): Promise<SignUp> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}user/signup/`;

    return this.http.post(url, JSON.stringify(object), options)
      .toPromise()
      .then(response => response.json() as SignUp)
      .catch(this.handleError);
  }

  settingProfile(object: any): Promise<SignUp> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}user/first_login/`;

    return this.http.put(url, JSON.stringify(object), options)
      .toPromise()
      .then(response => response.json() as SignUp)
      .catch(this.handleError);
  }

  createStore(object: any): Promise<Store> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store_create/`;

    return this.http.post(url, JSON.stringify(object), options)
      .toPromise()
      .then(response => response.json() as Store)
      .catch(this.handleError);
  }

  resetPassword(object:any): Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}user/resetpw/request/`;

    return this.http.post(url, JSON.stringify(object), options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getResetPasswordConfirm(object:any): Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}user/resetpw/confirm/${object.uid}/${object.token}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  resetPasswordConfirm(object:any): Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}user/resetpw/confirm/${object.uid}/${object.token}/`;

    return this.http.post(url, JSON.stringify(object), options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  validateCode(object:any): Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}user/invite_token/`;

    return this.http.put(url, JSON.stringify(object), options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  setSocialMediaLink(object:any): Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}set/social/link`;

    return this.http.put(url, JSON.stringify(object), options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
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
