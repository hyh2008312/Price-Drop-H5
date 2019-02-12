import { Input, Output, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-lottery-detail-title',
  templateUrl: './order-detail-title.component.html',
  styleUrls: ['../_lottery.scss']
})

export class OrderDetailTitleComponent implements OnInit {
  @Input() status: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
