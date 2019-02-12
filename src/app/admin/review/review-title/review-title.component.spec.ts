import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTitleComponent } from './review-title.component';

describe('ReviewTitleComponent', () => {
  let component: ReviewTitleComponent;
  let fixture: ComponentFixture<ReviewTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
