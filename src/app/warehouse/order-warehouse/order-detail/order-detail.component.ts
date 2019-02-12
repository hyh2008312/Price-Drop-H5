import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { Router,NavigationStart, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { OrderService } from '../order.service';
import { UserService } from  '../../../shared/services/user/user.service';

@Component({
  selector: 'app-warehouse-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['../_order.scss']
})

export class OrderDetailComponent implements OnInit {

  order: any = {
    lines: [{}]
  };
  shippingPrice: any = {};

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id'];
    this.orderService.getSupplyOrderDetail({
      id
    }).then((data) => {
      console.log(data);
      this.order = data;
      if(data.shippingPrice) {
        this.shippingPrice = data.shippingPrice;
      }
    });
  }

  productChange($event) {
    switch ($event.event) {
      case 'changeShippingNumber':
        this.order = $event.order;
        break;
      case 'cancelOrder':
        this.order = $event.order;
        break;
      case 'cancelFulfillment':
        this.order = $event.order;
        break;
      case 'audit':
        this.order = $event.order;
        break;
      case 'refund':
        this.order = $event.order;
        break;
    }
  }

}
