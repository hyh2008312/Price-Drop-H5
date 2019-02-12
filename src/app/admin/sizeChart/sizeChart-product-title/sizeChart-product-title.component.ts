import { Input, Output, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sizeChart-product-title',
  templateUrl: './sizeChart-product-title.component.html',
  styleUrls: ['../_sizeChart.scss']
})

export class SizeChartProductTitleComponent implements OnInit {
  @Input() status: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
