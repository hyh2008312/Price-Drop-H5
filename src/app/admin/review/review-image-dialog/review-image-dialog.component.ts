import { Component, OnInit, OnDestroy, Inject, NgZone} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ICarouselConfig, AnimationConfig } from '../../../shared/components/angular4-carousel/index';

@Component({
  selector: 'app-review-image-dialog',
  templateUrl: './review-image-dialog.component.html',
  styleUrls: ['../_review.scss']
})

export class ReviewImageDialogComponent implements OnInit {

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
    public dialogRef: MatDialogRef<ReviewImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  ngOnDestroy() {}

  close() {
    this.dialogRef.close();
  }

}
