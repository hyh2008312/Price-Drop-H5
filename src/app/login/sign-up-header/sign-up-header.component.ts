import { Input, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sign-up-header',
  templateUrl: './sign-up-header.component.html',
  styleUrls: ['../login.scss']
})

export class SignUpHeaderComponent implements OnInit {

  @Input() public step: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
