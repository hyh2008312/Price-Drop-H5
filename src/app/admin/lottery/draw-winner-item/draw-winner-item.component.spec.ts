import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawWinnerItemComponent } from './draw-winner-item.component';

describe('DrawWinnerItemComponent', () => {
  let component: DrawWinnerItemComponent;
  let fixture: ComponentFixture<DrawWinnerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawWinnerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawWinnerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
