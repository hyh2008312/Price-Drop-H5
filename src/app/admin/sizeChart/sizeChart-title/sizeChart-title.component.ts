import { Input, Output, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sizeChart-title',
  templateUrl: './sizeChart-title.component.html',
  styleUrls: ['../_sizeChart.scss']
})

export class SizeChartTitleComponent implements OnInit {
  @Input() status: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
