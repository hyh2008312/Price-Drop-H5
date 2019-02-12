import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryImageDialogComponent } from './inventory-image-dialog.component';

describe('InventoryImageDialogComponent', () => {
  let component: InventoryImageDialogComponent;
  let fixture: ComponentFixture<InventoryImageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryImageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
