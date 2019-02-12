import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ICarouselConfig, AnimationConfig } from '../../../shared/components/angular4-carousel/index';

@Component({
  selector: 'app-warehouse-inventory-image-dialog',
  templateUrl: './inventory-image-dialog.component.html',
  styleUrls: ['../_inventory.scss']
})

export class InventoryImageDialogComponent implements OnInit {

  public config: ICarouselConfig = {
    verifyBeforeLoad: true,
    log: false,
    animation: true,
    animationType: AnimationConfig.SLIDE,
    autoplay: false,
    autoplayDelay: 5000,
    stopAutoplayMinWidth: 0
  };

  constructor(
    public dialogRef: MatDialogRef<InventoryImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  ngOnDestroy() {}

  close() {
    this.dialogRef.close();
  }

}
