import { Component, Input, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./_count-down.scss']
})

export class CountDownComponent implements AfterViewInit, OnDestroy{

  @Input() endDate: any;
  private hour: any = '00';
  private minute: any = '00';
  private second: any = '00';
  private _diff: number;
  private get diff() {
    return this._diff;
  }
  private set diff(val) {
    this._diff = Math.floor(val / 1000);

    this.hour = Math.floor(this._diff / 3600);
    if ( this.hour < 10) {
      this.hour = '0' + this.hour
    }
    this.minute = Math.floor((this._diff % 3600) / 60);
    if ( this.minute < 10) {
      this.minute = '0' + this.minute
    }
    this.second = (this._diff % 3600) % 60;
    if ( this.second < 10) {
      this.second = '0' + this.second
    }
    if ((this.hour.toString()).indexOf('-') > 0) {
      this.hour = '00';
      this.minute = '00';
      this.second = '00';
    }
  }
  private timer;

  ngAfterViewInit() {
    const myDate: any = new Date(this.endDate)
    this.timer = setInterval(() => {
      this.diff =   myDate - Date.now();
    }, 1000);
  }
  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  constructor() {}
}
