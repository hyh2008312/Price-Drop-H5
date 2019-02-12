import { Input, Component } from '@angular/core';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss']
})

export class ShareButtonComponent {
  @Input() public link: string;
  @Input() public text: string;
  @Input() public style: any;


}
