import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawWinnerTitleComponent } from './draw-winner-title.component';

describe('DrawWinnerTitleComponent', () => {
  let component: DrawWinnerTitleComponent;
  let fixture: ComponentFixture<DrawWinnerTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawWinnerTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawWinnerTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
