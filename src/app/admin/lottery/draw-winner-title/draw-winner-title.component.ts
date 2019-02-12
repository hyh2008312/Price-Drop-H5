import { Input, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-lottery-draw-winner-title',
  templateUrl: './draw-winner-title.component.html',
  styleUrls: ['../_lottery.scss']
})

export class DrawWinnerTitleComponent implements OnInit {
  @Input() status: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {

  }



}
