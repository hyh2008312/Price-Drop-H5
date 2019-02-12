import { Input, Output, Component, OnInit,EventEmitter} from '@angular/core';

import { InventoryService } from '../inventory.service';
import { InventoryImageDialogComponent } from '../inventory-image-dialog/inventory-image-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import {ToolTipsComponent} from '../tool-tips/tool-tips.component';

@Component({
  selector: 'app-warehouse-inventory-item',
  templateUrl: './inventory-item.component.html',
  styleUrls: ['../_inventory.scss']
})

export class InventoryItemComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any;
  @Input() index: number = 0;
  @Output() productChange = new EventEmitter<any>();

  currency: string = 'INR';
  isSuperuser: boolean = false;
  isEdit: boolean = false;

  constructor(
    private inventoryService: InventoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {


  }

  openLargeImage(data) {
    let dialogRef = this.dialog.open(InventoryImageDialogComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  copy($event) {
    this.openCopyBar();
  }

  openCopyBar() {
    this.snackBar.openFromComponent(ToolTipsComponent, {
      data: 'Successfully Copied!',
      duration: 1500,
      verticalPosition: 'top'
    });
  }

  edit() {
    if(!this.isEdit) {
      this.isEdit = true;
    } else {
      this.inventoryService.editInventory(this.product).then((data) => {
        this.product = data;
        this.isEdit = false;
      });
    }
  }

}
