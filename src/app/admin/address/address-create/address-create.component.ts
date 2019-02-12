import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute} from '@angular/router';

import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-address-create',
  templateUrl: './address-create.component.html',
  styleUrls: ['../_address.scss']
})

export class AddressCreateComponent implements OnInit {

  currency: string = 'USD';

  addressForm: FormGroup;

  stateList: any;

  constructor(
    private addressService: AddressService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    this.addressForm = this.fb.group({
      contactName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      zoneCode: ['86', Validators.required],
      address: ['', Validators.required],
      province: ['', Validators.required],
      city: ['', Validators.required],
      postcode: ['', Validators.required],
      default: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    this.addressService.getStateList().then((data) => {
      this.stateList = [...data];
    });
  }

  create() {
    if(this.addressForm.invalid) {
      return;
    }
    this.addressService.create(this.addressForm.value).then(() => {
      this.router.navigate(['../'], { replaceUrl: true, relativeTo: this.activatedRoute});
    });
  }

}
