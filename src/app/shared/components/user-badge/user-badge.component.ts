import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-badge',
  templateUrl: './user-badge.component.html',
  styleUrls: ['./user-badge.component.scss']
})

export class UserBadgeComponent implements OnInit {
  @Input() public point: number;
  private badges: Array<string> = ['icon-star','icon-mark-fruit-','icon-ic_cup'];

  ngOnInit(): void {
  }

}
