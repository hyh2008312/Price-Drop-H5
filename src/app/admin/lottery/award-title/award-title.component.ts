import { Input, Output, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-award-title',
  templateUrl: './award-title.component.html',
  styleUrls: ['../_lottery.scss']
})

export class AwardTitleComponent implements OnInit {
  @Input() status: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
