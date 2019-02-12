import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveProductDialogComponent } from './save-product-dialog.component';

describe('SaveProductDialogComponent', () => {
  let component: SaveProductDialogComponent;
  let fixture: ComponentFixture<SaveProductDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveProductDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
