import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions } from '@angular/http';
import {Router} from '@angular/router';

import 'rxjs/add/operator/toPromise';
import{ Subject, BehaviorSubject } from 'rxjs';

import { BaseApi } from '../../config/app.api';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';

@Injectable()
export class StatisticsService {

  constructor( private http: Http, private baseUrl: BaseApi, private auth: AuthenticationService,
               public router: Router) {

  }

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
