import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawParticipantTitleComponent } from './draw-participant-title.component';

describe('DrawParticipantTitleComponent', () => {
  let component: DrawParticipantTitleComponent;
  let fixture: ComponentFixture<DrawParticipantTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawParticipantTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawParticipantTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
