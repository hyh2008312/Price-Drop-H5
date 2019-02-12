import {Input, Output, Component, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-admin-keywords-title',
  templateUrl: './keywords-title.component.html',
  styleUrls: ['../_keywords.scss']
})

export class KeywordsTitleComponent implements OnInit {

  @Input() status = 0;

  constructor() {
  }

  ngOnInit(): void {
  }
}
