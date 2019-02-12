import { Input, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-lottery-promote-title',
  templateUrl: './promote-title.component.html',
  styleUrls: ['../_lottery.scss']
})

export class PromoteTitleComponent implements OnInit {
  @Input() status: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {

  }



}
