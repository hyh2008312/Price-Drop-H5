import { Input, Output, Component, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-warehouse-order-detail-tracking-item',
  templateUrl: './order-detail-tracking-item.component.html',
  styleUrls: ['../_order.scss']
})

export class OrderDetailTrackingItemComponent implements OnInit {

  @Input() order:any = {};
  @Input() shippingPrice:any = {};

  constructor(

  ) { }

  ngOnInit(): void {

  }

}
