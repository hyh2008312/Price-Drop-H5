import { Input, Output, Component, OnInit,EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LotteryService } from '../lottery.service';
import { UserService } from  '../../../shared/services/user/user.service';

@Component({
  selector: 'app-award-item',
  templateUrl: './award-item.component.html',
  styleUrls: ['../_lottery.scss']
})

export class AwardItemComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any;
  @Input() index: number = 0;
  @Output() productChange = new EventEmitter<any>();

  currency: string = 'INR';
  isSuperuser: boolean = false;

  constructor(
    private adminService: LotteryService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.userService.currentUser.subscribe((data) => {
      if(data) {
        if(data.isStaff && data.isSuperuser) {
          this.isSuperuser = true
        }
      }
    });
  }

  ngOnInit(): void {


  }

  delete() {
    let self = this;
    this.adminService.deletePrize({
      id: this.product.id
    }).then((data) => {
      self.productChange.emit({
        index: this.index,
        product : data,
        status: this.status,
        event: 'delete'
      });
    });
  }

  edit() {
    this.router.navigate([`./prize/edit/${this.product.id}`], {relativeTo: this.activatedRoute});
  }

}
