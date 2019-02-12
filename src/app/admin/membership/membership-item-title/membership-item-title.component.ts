import { Input, Output, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-membership-item-title',
  templateUrl: './membership-item-title.component.html',
  styleUrls: ['../_membership.scss']
})

export class MembershipItemTitleComponent implements OnInit {
  @Input() status: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
