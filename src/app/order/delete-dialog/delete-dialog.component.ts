import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {OrderListService} from '../order-list.service';
import {ToastComponent} from '../../shared/components/toast/toast.component';


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./_delete-dialog.scss']
})

export class DeleteDialogComponent implements OnInit {
  content: any= '';
  id: any= '';
  type: any= '';
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderListService: OrderListService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.content = this.data.content;
    this.type = this.data.type;
    this.id = this.data.id;
  }
  OK() {
    this.data.stu = 'ok';
    if (this.type === 'address') {
      this.delAddress();
    } else if (this.type === 'order') {
      this.delOrder();
    }
  }
  delAddress() {
      this.orderListService.delAddress(this.id).then((res) => {
        this.toast('Delete address success!');
        this.close();
      }).catch((res) => {
        console.log(res);
      });
  }
  delOrder() {
    this.orderListService.delOrder(this.id).then((res) => {
      this.toast('Deleted successfully!');
      this.close();
    }).catch((res) => {
      console.log(res);
    });
  }
  Cancel() {
    this.close();
  }
  toast(string) {
    this.snackBar.openFromComponent(ToastComponent, {
      data: {
        string: string
      },
      duration: 500,
    });
  }
  close(): void {
    this.dialogRef.close();
    // this.statusChange.emit(true)
  }
}
