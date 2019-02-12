import { Input, Output, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-order-title',
  templateUrl: './order-title.component.html',
  styleUrls: ['../order.scss']
})

export class OrderTitleComponent implements OnInit {
  @Input() status: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {

  }



}
