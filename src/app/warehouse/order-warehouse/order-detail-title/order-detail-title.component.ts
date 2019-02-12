import { Input, Output, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-warehouse-order-detail-title',
  templateUrl: './order-detail-title.component.html',
  styleUrls: ['../_order.scss']
})

export class OrderDetailTitleComponent implements OnInit {
  @Input() status: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
