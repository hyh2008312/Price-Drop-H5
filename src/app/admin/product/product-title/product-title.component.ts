import {Input, Output, Component, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-product-title',
  templateUrl: './product-title.component.html',
  styleUrls: ['../product.scss']
})

export class ProductTitleComponent implements OnInit {
  @Input() status: number = 0;

  @Output() checkedChange = new EventEmitter<any>();

  @Input() checked: boolean = false;

  constructor(
  ) { }

  ngOnInit(): void {

  }

  changeChecked($event) {

    this.checked = $event.checked;
    this.checkedChange.emit({
      change : this.checked,
      status: this.status,
      event: 'selected'
    });
  }

}
