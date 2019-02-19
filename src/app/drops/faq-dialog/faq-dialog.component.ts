import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';



@Component({
  selector: 'faq-dialog',
  templateUrl: './faq-dialog.component.html',
  styleUrls: ['./_faq-dialog.scss']
})

export class FaqDialogComponent implements OnInit {

  @Output() valueChange:any = new EventEmitter();


  constructor() {
  }

  ngOnInit():void {

  }

  close():void {
    this.valueChange.emit(true)
  }
}
