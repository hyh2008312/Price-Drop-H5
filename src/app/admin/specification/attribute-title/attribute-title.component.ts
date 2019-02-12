import { Input, Output, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-attribute-title',
  templateUrl: './attribute-title.component.html',
  styleUrls: ['../_specification.scss']
})

export class AttributeTitleComponent implements OnInit {
  @Input() status: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
