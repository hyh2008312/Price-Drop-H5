import { Input, Output, Component, OnInit, EventEmitter} from '@angular/core';
import { SizeChartService } from '../sizeChart.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-sizeChart-product-item',
  templateUrl: './sizeChart-product-item.component.html',
  styleUrls: ['../_sizeChart.scss']
})

export class SizeChartProductItemComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any;
  @Input() index: number = 0;
  @Output() productChange = new EventEmitter<any>();

  constructor(
    private sizeChartService: SizeChartService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {

  }

  delete() {
    this.sizeChartService.deleteSizeChartProduct(this.product).then((data) => {
      this.productChange.emit({
        index: this.index,
        item: data,
        status: this.status,
        event: 'delete'
      });
    });
  }

}
