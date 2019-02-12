import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-score-points',
  templateUrl: './score-points.component.html',
  styleUrls: ['./score-points.component.scss']
})

export class ScorePointsComponent implements OnInit {
  @Input() public score: number;
  number: number[] = [1,2,3,4,5];

  ngOnInit(): void {

  }

}
