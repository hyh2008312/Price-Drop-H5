import { Input, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-lottery-draw-participant-title',
  templateUrl: './draw-participant-title.component.html',
  styleUrls: ['../_lottery.scss']
})

export class DrawParticipantTitleComponent implements OnInit {
  @Input() status: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {

  }



}
