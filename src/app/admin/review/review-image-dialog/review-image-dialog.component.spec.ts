import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewImageDialogComponent } from './review-image-dialog.component';

describe('ReviewImageDialogComponent', () => {
  let component: ReviewImageDialogComponent;
  let fixture: ComponentFixture<ReviewImageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewImageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
