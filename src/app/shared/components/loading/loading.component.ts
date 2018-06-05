import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./_loading.scss']
})

export class LoadingComponent implements OnInit {

  @Input() status: boolean = false;

  constructor(
  ) {

  }

  ngOnInit():void {

  }

  isPopOpen: boolean = false;

  openPop() {
    this.isPopOpen = !this.isPopOpen;
  }


}
