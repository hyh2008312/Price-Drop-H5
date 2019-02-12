import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { AddressService } from '../address.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-address-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['../_address.scss']
})

export class AddressEditComponent implements OnInit {

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
      id: ['', Validators.required],
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


    const id = this.activatedRoute.snapshot.params['id'];

    this.addressService.getAddressDetail({
      id
    }).then((data) => {
      this.addressForm.patchValue({
        id: data.id,
        contactName: data.contactName,
        phoneNumber: data.phoneNumber,
        zoneCode: data.zoneCode,
        address: data.address,
        province: data.stateId,
        city: data.city,
        postcode: data.postcode,
        default: data.default
      })
    });
  }

  edit() {
    if(this.addressForm.invalid) {
      return;
    }
    this.addressService.editAddress(this.addressForm.value).then(() => {
      this.router.navigate(['../../'], { replaceUrl: true, relativeTo: this.activatedRoute});
    });
  }
}
