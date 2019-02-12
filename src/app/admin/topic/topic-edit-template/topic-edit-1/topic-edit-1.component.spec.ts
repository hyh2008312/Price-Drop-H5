import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicEditOneComponent } from './topic-edit-1.component';

describe('TopicEditOneComponent', () => {
  let component: TopicEditOneComponent;
  let fixture: ComponentFixture<TopicEditOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicEditOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicEditOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
