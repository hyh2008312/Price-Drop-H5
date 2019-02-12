import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})

export class UserAvatarComponent implements OnInit {
  @Input() public avatar: string;
  @Input() public name: string;
  @Input() public large: boolean;

  ngOnInit(): void {

  }

}
