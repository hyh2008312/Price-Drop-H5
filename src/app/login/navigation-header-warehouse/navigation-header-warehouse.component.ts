import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-header-warehouse',
  templateUrl: './navigation-header-warehouse.component.html',
  styleUrls: ['./_navigation-header-warehouse.scss']
})

export class NavigationHeaderWarehouseComponent implements OnInit {

  @Input() status: boolean = false;

  constructor() {

  }

  ngOnInit():void {

  }

}
