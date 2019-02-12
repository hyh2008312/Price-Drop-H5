import {Input, Output, Component, OnInit, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin-keywords-item',
  templateUrl: './keywords-item.component.html',
  styleUrls: ['../_keywords.scss']
})

export class KeywordsItemComponent implements OnInit {

  @Input() status = 0;
  @Input() item: any = {};
  @Input() index: any = 0;
  @Output() userChange = new EventEmitter<any>();

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
  }

  jump() {
    this.router.navigate([`./detail/${this.item.id}`], {relativeTo: this.activatedRoute});
  }
}
