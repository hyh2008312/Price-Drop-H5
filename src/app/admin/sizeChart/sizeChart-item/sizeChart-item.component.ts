import { Input, Output, Component, OnInit,EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SizeChartService } from '../sizeChart.service';
import { UserService } from  '../../../shared/services/user/user.service';

@Component({
  selector: 'app-sizeChart-item',
  templateUrl: './sizeChart-item.component.html',
  styleUrls: ['../_sizeChart.scss']
})

export class SizeChartItemComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any;
  @Input() parent: any;
  @Input() index: number = 0;
  @Output() productChange = new EventEmitter<any>();

  currency: string = 'INR';
  isSuperuser: boolean = false;

  constructor(
    private sizeChartService: SizeChartService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {


  }


  edit() {
    this.router.navigate([`./edit/${this.product.id}`], {relativeTo: this.activatedRoute});
  }

  delete() {
    this.sizeChartService.deleteSizeChart({
      id: this.product.id
    }).then((data) => {
      this.productChange.emit({
        index: this.index,
        product: this.product,
        status: this.status,
        event: 'delete'
      });
    })
  }

}
