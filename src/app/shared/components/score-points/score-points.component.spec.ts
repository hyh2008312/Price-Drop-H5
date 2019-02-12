import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorePointsComponent } from './score-points.component';

describe('UserAvatarComponent', () => {
  let component: ScorePointsComponent;
  let fixture: ComponentFixture<ScorePointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScorePointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorePointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
