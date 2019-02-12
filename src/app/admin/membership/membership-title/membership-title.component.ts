import { Input, Output, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-membership-title',
  templateUrl: './membership-title.component.html',
  styleUrls: ['../_membership.scss']
})

export class MembershipTitleComponent implements OnInit {
  @Input() status: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
