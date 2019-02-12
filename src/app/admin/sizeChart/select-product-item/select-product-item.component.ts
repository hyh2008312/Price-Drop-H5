import { Input, Output, Component, OnInit,EventEmitter} from '@angular/core';

import { SizeChartService } from '../sizeChart.service';

@Component({
  selector: 'app-sizeChart-select-product-item',
  templateUrl: './select-product-item.component.html',
  styleUrls: ['../_sizeChart.scss']
})

export class SelectProductItemComponent implements OnInit {

  @Input() promote: any={};
  @Input() index: any = 0;
  @Input() promoteId: any;
  @Output() promoteChange = new EventEmitter<any>();

  currency: string = 'INR';

  constructor(
    private sizeChartService: SizeChartService
  ) { }

  ngOnInit(): void {

  }

  selectPromotionProduct() {
    let params: any = {};
    params.chartId = this.promoteId;
    params.productId = [this.promote.id];

    this.sizeChartService.addProduct(params).then(((data) => {
      this.promote = data;
      this.promoteChange.emit({
        index: this.index,
        promote : data,
        event: 'changed'
      });
    }));
  }

}
