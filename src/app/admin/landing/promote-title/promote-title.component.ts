import { Input, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-promote-title',
  templateUrl: './promote-title.component.html',
  styleUrls: ['../_landing.scss']
})

export class PromoteTitleComponent implements OnInit {
  @Input() status: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {

  }



}
