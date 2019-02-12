import {Input, Output, Component, OnInit, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin-report-item',
  templateUrl: './report-item.component.html',
  styleUrls: ['../_report.scss']
})

export class ReportItemComponent implements OnInit {
  @Input() status: number = 0;
  @Input() product: any;
  @Input() index: number = 0;
  @Input() page: number = 1;
  @Input() pageSize: number = 1;

  constructor() {
  }

  ngOnInit(): void {
  }


}
