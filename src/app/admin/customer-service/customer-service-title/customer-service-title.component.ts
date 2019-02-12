import {Input, Output, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-customer-service-title',
  templateUrl: './customer-service-title.component.html',
  styleUrls: ['../_customer-service.scss']
})

export class CustomerServiceTitleComponent implements OnInit {
  @Input() status: number = 1;

  constructor() {
  }

  ngOnInit(): void {

  }


}
