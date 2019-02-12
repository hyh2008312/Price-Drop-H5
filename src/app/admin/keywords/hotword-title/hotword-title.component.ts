import {Input, Output, Component, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-admin-hotword-title',
  templateUrl: './hotword-title.component.html',
  styleUrls: ['../_keywords.scss']
})

export class HotwordTitleComponent implements OnInit {

  @Input() status = 0;

  constructor() {
  }

  ngOnInit(): void {
  }
}
