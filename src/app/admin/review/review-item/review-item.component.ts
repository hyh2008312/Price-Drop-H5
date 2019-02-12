import { Input, Output, Component, OnInit,EventEmitter} from '@angular/core';

import { ReviewService } from '../review.service';
import { UserService } from  '../../../shared/services/user/user.service';
import { ReviewImageDialogComponent } from '../review-image-dialog/review-image-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['../_review.scss']
})

export class ReviewItemComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any;
  @Input() parent: any;
  @Input() index: number = 0;
  @Output() productChange = new EventEmitter<any>();

  currency: string = 'INR';
  isSuperuser: boolean = false;

  constructor(
    private reviewService: ReviewService,
    private userService: UserService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {}

  ngOnChanges(): void {

  }

  publish() {
    let params: any = {
      id: this.product.id,
      commentStatus: 'published'
    };
    this.reviewService.changeReviewStatus(params).then((data) => {
      this.productChange.emit({
        index: this.index,
        product : data,
        status: this.status,
        event: 'published'
      });
    });
  }

  unpublish() {
    let params: any = {
      id: this.product.id,
      commentStatus: 'unpublished'
    };
    this.reviewService.changeReviewStatus(params).then((data) => {
      this.productChange.emit({
        index: this.index,
        product : data,
        status: this.status,
        event: 'unpublished'
      });
    });
  }

  openLargeImage(data) {
    let dialogRef = this.dialog.open(ReviewImageDialogComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  getScore(item) {
    let i = 1;
    let score = [];
    while (i <= parseInt(item))
    {
      score.push(true);
      i++;
    }
    return score;
  }

  getUnscore(item) {
    let i = 1;
    let score = [];
    while (i <= (5 - parseInt(item)))
    {
      score.push(true);
      i++;
    }
    return score;
  }

}
