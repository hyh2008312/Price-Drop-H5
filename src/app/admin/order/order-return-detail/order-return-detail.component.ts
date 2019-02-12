import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,NavigationStart, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { OrderService } from '../order.service';
import { UserService } from  '../../../shared/services/user/user.service';

@Component({
  selector: 'app-order-return-detail',
  templateUrl: './order-return-detail.component.html',
  styleUrls: ['../order.scss']
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
