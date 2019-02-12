import { Input, Output, Component, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-order-detail-tracking-item',
  templateUrl: './order-detail-tracking-item.component.html',
  styleUrls: ['../order.scss']
})

export class OrderDetailTrackingItemComponent implements OnInit {

  @Input() order:any = {};
  @Input() shippingPrice:any = {};

  constructor(

  ) { }

  ngOnInit(): void {

  }

}
