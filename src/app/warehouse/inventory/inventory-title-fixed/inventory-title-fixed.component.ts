import {Input, Output, Component, OnInit, EventEmitter, ElementRef, NgZone} from '@angular/core';

@Component({
  selector: 'app-warehouse-inventory-title-fixed',
  templateUrl: './inventory-title-fixed.component.html',
  styleUrls: ['../_inventory.scss']
})

export class InventoryTitleFixedComponent implements OnInit {

  @Input() status: any = 0;

  constructor() { }

  ngOnInit(): void {

  }

}
