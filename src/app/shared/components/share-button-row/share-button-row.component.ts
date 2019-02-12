import { Input, Component } from '@angular/core';

@Component({
  selector: 'app-share-button-row',
  templateUrl: './share-button-row.component.html',
  styleUrls: ['./share-button-row.component.scss']
})

export class ShareButtonRowComponent {
  @Input() public link: string;
  @Input() public text: string;

}
