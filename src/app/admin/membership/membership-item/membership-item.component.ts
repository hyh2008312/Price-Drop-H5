import { Input, Output, Component, OnInit,EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MembershipService } from '../membership.service';
import { UserService } from  '../../../shared/services/user/user.service';

@Component({
  selector: 'app-membership-item',
  templateUrl: './membership-item.component.html',
  styleUrls: ['../_membership.scss']
})

export class MembershipItemComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any;
  @Input() index: number = 0;
  @Output() productChange = new EventEmitter<any>();

  currency: string = 'INR';
  isSuperuser: boolean = false;

  constructor(
    private adminService: MembershipService,
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
