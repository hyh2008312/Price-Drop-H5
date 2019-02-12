import { Component, OnInit, OnDestroy, Inject, NgZone} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ICarouselConfig, AnimationConfig } from '../../../shared/components/angular4-carousel/index';

@Component({
  selector: 'app-warehouse-home-image-dialog',
  templateUrl: './home-image-dialog.component.html',
  styleUrls: ['../_home.scss']
})

export class HomeImageDialogComponent implements OnInit {

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
    public dialogRef: MatDialogRef<HomeImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  ngOnDestroy() {}

  close() {
    this.dialogRef.close();
  }

}
