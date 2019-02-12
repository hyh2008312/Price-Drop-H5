import {Input, Output, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard-title',
  templateUrl: './dashboard-title.component.html',
  styleUrls: ['../_dashboard.scss']
})

export class DashboardTitleComponent implements OnInit {
  @Input() status: number = 1;

  constructor() {
  }

  ngOnInit(): void {

  }


}
