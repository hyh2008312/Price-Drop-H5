import { Input, Output, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-review-title',
  templateUrl: './review-title.component.html',
  styleUrls: ['../_review.scss']
})

export class ReviewTitleComponent implements OnInit {
  @Input() status: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
