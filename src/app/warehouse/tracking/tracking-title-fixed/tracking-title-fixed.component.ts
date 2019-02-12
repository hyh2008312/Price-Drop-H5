import {Input, Output, Component, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-warehouse-tracking-title-fixed',
  templateUrl: './tracking-title-fixed.component.html',
  styleUrls: ['../_tracking.scss']
})

export class TrackingTitleFixedComponent implements OnInit {

  @Input() status: any;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
