import { Input, Output, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-attribute-category-title',
  templateUrl: './attribute-category-title.component.html',
  styleUrls: ['../_specification.scss']
})

export class AttributeCategoryTitleComponent implements OnInit {
  @Input() status: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
