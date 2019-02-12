import { Input, Output, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-warehouse-order-title-fixed',
  templateUrl: './order-title-fixed.component.html',
  styleUrls: ['../_order.scss']
})

export class OrderTitleFixedComponent implements OnInit {
  @Input() status: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {

  }



}
