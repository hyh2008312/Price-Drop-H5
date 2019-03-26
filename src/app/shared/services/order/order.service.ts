import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import{ Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class OrderService {
  detail: Subject<any> = new BehaviorSubject<any>(null);
  paymentDetail: Subject<any> = new BehaviorSubject<any>(null);
  public addOrder(detail: any): void {
    this.detail.next(detail);
  }
  public paymentOrder(detail: any): void {
    this.paymentDetail.next(detail);
  }

  constructor(

  ) {

  }


}
