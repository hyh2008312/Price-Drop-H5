import { Input, Output, Component, OnInit, OnChanges, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-lottery-detail-item',
  templateUrl: './order-detail-item.component.html',
  styleUrls: ['../_lottery.scss']
})

export class OrderDetailItemComponent implements OnInit {

  @Input() status: number = 0;
  @Input() order: any;
  @Input() index: number = 0;
  @Output() productChange = new EventEmitter<any>();

  currency:string = 'INR';

  cutAmount: any = 0;

  constructor(
    private router: Router,
    overlayContainer: OverlayContainer
  ) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
  }

  ngOnInit(): void {

  }

  ngOnChanges() {
  }


}
