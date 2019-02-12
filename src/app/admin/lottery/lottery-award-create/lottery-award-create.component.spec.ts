import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryAwardCreateComponent } from './lottery-award-create.component';

describe('LotteryAwardCreateComponent', () => {
  let component: LotteryAwardCreateComponent;
  let fixture: ComponentFixture<LotteryAwardCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotteryAwardCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryAwardCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
