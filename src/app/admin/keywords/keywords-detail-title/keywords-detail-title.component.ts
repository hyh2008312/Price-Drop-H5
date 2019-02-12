import {Input, Output, Component, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-admin-keywords-detail-title',
  templateUrl: './keywords-detail-title.component.html',
  styleUrls: ['../_keywords.scss']
})

export class KeywordsDetailTitleComponent implements OnInit {

  @Input() status = 0;

  constructor() {
  }

  ngOnInit(): void {
  }
}
