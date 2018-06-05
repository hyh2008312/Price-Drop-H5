import { Input, Component } from '@angular/core';

@Component({
  selector: 'app-share-show-button',
  templateUrl: './share-show-button.component.html',
  styleUrls: ['./_share-show-button.component.scss']
})

export class ShareShowButtonComponent {
  @Input() public link: string;
  @Input() public text: string;
  @Input() public style: any;


}
