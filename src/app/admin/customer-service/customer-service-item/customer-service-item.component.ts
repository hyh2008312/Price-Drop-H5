import {Input, Output, Component, OnInit, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AdminService} from '../../admin.service';
import {UserService} from '../../../shared/services/user/user.service';

@Component({
  selector: 'app-customer-service-item',
  templateUrl: './customer-service-item.component.html',
  styleUrls: ['../_customer-service.scss']
})

export class CustomerServiceItemComponent implements OnInit {
  @Input() status: number = 1;
  @Input() product: any;
  @Input() index: number = 0;
  @Output() productChange = new EventEmitter<any>();

  timeLeft: string = '';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.status === 1) {
      let now = Date.parse(this.product.nowTime);
      let modify = Date.parse(this.product.modified);
      let subtraction = now - modify;  // 毫秒值
      let sumMinutes = Math.floor(subtraction / (1000 * 60));
      let hours = Math.floor(sumMinutes / 60);
      let minutes = sumMinutes % 60;
      if (this.product.isExpired && hours < 48) {
        this.timeLeft = `${47 - hours} hours,${60 - minutes} mins`;
      } else {
        this.timeLeft = `Expired`;
      }
    } else if (this.status === 2) {
      this.timeLeft = this.product.supplierModified;
    } else if (this.status === 3) {
      this.timeLeft = this.product.modified;
    }
  }

  jumpCustomerServiceDetail() {
    this.router.navigate(['./detail', this.product.lineId], {relativeTo: this.activatedRoute});
  }
}
