import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVariantDialogComponent } from './add-variant-dialog.component';

describe('AddVariantDialogComponent', () => {
  let component: AddVariantDialogComponent;
  let fixture: ComponentFixture<AddVariantDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVariantDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVariantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
