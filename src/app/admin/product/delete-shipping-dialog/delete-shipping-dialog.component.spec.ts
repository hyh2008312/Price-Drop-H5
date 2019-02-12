import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVariantDialogComponent } from './delete-variant-dialog.component';

describe('DeleteVariantDialogComponent', () => {
  let component: DeleteVariantDialogComponent;
  let fixture: ComponentFixture<DeleteVariantDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteVariantDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteVariantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
