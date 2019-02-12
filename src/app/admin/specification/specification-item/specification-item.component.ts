import { Input, Output, Component, OnInit,EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SpecificationService } from '../specification.service';
import { UserService } from  '../../../shared/services/user/user.service';

@Component({
  selector: 'app-specification-item',
  templateUrl: './specification-item.component.html',
  styleUrls: ['../_specification.scss']
})

export class SpecificationItemComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any = {
    id: '',
    data: {
      name: ''
    }
  };
  @Input() parent: any;
  @Input() index: number = 0;
  @Output() productChange = new EventEmitter<any>();

  currency: string = 'INR';
  isSuperuser: boolean = false;

  constructor(
    private adminService: SpecificationService,
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


  edit() {
    this.router.navigate([`./edit/${this.product.id}`], {relativeTo: this.activatedRoute});
  }

}
