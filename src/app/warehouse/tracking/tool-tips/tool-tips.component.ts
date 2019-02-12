import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
  selector: 'app-warehouse-tracking-tool-tips',
  template: '{{ data }}',
})
export class ToolTipsComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
