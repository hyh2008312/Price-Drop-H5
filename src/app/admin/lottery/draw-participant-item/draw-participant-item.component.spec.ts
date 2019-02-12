import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawParticipantItemComponent } from './draw-participant-item.component';

describe('DrawParticipantItemComponent', () => {
  let component: DrawParticipantItemComponent;
  let fixture: ComponentFixture<DrawParticipantItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawParticipantItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawParticipantItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
