import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicCreateTwoComponent } from './topic-create-2.component';

describe('TopicCreateTwoComponent', () => {
  let component: TopicCreateTwoComponent;
  let fixture: ComponentFixture<TopicCreateTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicCreateTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicCreateTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
