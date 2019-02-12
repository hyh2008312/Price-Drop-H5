import { Injectable } from '@angular/core';

import{ Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class GuardLinkService {
  routerLink: Subject<any> = new BehaviorSubject<any>(null);


  public addRouterLink(newLink: any): void {
    this.routerLink.next(newLink);
  }

  constructor(

  ) {

  }


}
