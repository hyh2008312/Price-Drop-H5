import {Input, Output, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-report-title',
  templateUrl: './report-title.component.html',
  styleUrls: ['../_report.scss']
})

export class ReportTitleComponent implements OnInit {
  @Input() status: number = 1;

  constructor() {
  }

  ngOnInit(): void {

  }


}
