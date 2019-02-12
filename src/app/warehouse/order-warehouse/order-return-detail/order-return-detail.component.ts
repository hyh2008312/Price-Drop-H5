import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { Router,NavigationStart, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { OrderService } from '../order.service';

@Component({
  selector: 'app-warehouse-order-return-detail',
  templateUrl: './order-return-detail.component.html',
  styleUrls: ['../_order.scss']
})

export class OrderReturnDetailComponent implements OnInit {

  order: any = {};
  annexName: any = '';
  product: any = {};
  shippingAddress: any;
  shippingPrice: any = {};

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id'];
    this.orderService.getReturnOrderDetail({
      id
    }).then((data) => {
      this.order = data;
      this.annexName = data.annex.split('/source/annex/')[1];
      this.product = data.line;
      if(data.line.shippingAddress) {
        this.shippingAddress = data.line.shippingAddress;
      }
      if(data.line.shippingPrice) {
        this.shippingPrice = data.line.shippingPrice;
      }
    });
  }

  productChange($event) {
    this.order = $event.order;
  }

}
