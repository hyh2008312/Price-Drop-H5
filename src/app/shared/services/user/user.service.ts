import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import{ Subject, BehaviorSubject } from 'rxjs';

import { AuthenticationService } from '../authentication/authentication.service';

import { BaseApi,SystemConstant } from '../../../config/app.api';
import { User } from './user';
import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class UserService {
  currentUser: Subject<any> = new BehaviorSubject<any>(null);
  inLogin: Subject<any> = new BehaviorSubject<any>(null);
  navigation: Subject<any> = new BehaviorSubject<any>(null);
  closeDownload: Subject<any> = new BehaviorSubject<any>(null);

  public addUser(newUser: User): void {
    this.currentUser.next(newUser);
  }
  public addLogin(isLogin: any): void {
    this.inLogin.next(isLogin);
  }
  public addNavigation(title: any): void {
    this.navigation.next(title);
  }
  public addCloseDownload(close: any): void {
    this.closeDownload.next(close);
  }

  constructor(
    private http: Http,
    private baseUrl: BaseApi,
    private systemConstant: SystemConstant,
    private auth: AuthenticationService,
    public titleService: Title,
    public metaService: Meta,
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
