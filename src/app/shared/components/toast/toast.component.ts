import {Component, OnInit, Input, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./_toast.scss']
})

export class ToastComponent implements OnInit {

  @Input() string: any;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    ) {}

  ngOnInit(): void {
  }

}
