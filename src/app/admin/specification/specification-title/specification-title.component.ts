import { Input, Output, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-specification-title',
  templateUrl: './specification-title.component.html',
  styleUrls: ['../_specification.scss']
})

export class SpecificationTitleComponent implements OnInit {
  @Input() status: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
