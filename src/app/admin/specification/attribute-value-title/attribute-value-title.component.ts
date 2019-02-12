import { Input, Output, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-attribute-value-title',
  templateUrl: './attribute-value-title.component.html',
  styleUrls: ['../_specification.scss']
})

export class AttributeValueTitleComponent implements OnInit {
  @Input() status: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
