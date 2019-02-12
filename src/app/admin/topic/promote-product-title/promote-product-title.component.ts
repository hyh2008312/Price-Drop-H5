import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-promote-product-title',
  templateUrl: './promote-product-title.component.html',
  styleUrls: ['../_topic.scss']
})

export class PromoteProductTitleComponent implements OnInit {
  @Input() status:number = 0;

  constructor() { }

  ngOnInit(): void {

  }

}
