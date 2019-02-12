import {Input, Output, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-account-title',
  templateUrl: './account-title.component.html',
  styleUrls: ['../_account.scss']
})

export class AccountTitleComponent implements OnInit {
  @Input() status: number = 1;

  constructor() {
  }

  ngOnInit(): void {

  }


}
