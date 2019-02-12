import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryAwardEditComponent } from './lottery-award-edit.component';

describe('LotteryAwardEditComponent', () => {
  let component: LotteryAwardEditComponent;
  let fixture: ComponentFixture<LotteryAwardEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotteryAwardEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryAwardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
