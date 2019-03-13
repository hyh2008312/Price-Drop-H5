import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import{ Subject, BehaviorSubject } from 'rxjs';

import { AuthenticationService } from '../authentication/authentication.service';

import { BaseApi,SystemConstant } from '../../../config/app.api';
import { User } from './user';

@Injectable()
export class UserService {
  currentUser: Subject<any> = new BehaviorSubject<any>(null);
  inLogin: Subject<any> = new BehaviorSubject<any>(null);
  navigation: Subject<any> = new BehaviorSubject<any>(null);

  public addUser(newUser: User): void {
    this.currentUser.next(newUser);
  }
  public addLogin(isLogin: any): void {
    this.inLogin.next(isLogin);
  }
  public addNavigation(title: any): void {
    this.navigation.next(title);
  }
  constructor(
    private http: Http,
    private baseUrl: BaseApi,
    private systemConstant: SystemConstant,
    private auth: AuthenticationService
  ) {

  }

  createAuthorizationHeader(headers: Headers) {

    this.auth.getAccessToken().subscribe((data) => {
      if(data) {
        headers.append('Authorization', 'Bearer ' + data);
      }
    });

  }
  getUser(): Promise<User>  {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.h5Url}user/user/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.msg ? error.msg : error.toString();
    }
    return Promise.reject(errMsg);
  }

}
