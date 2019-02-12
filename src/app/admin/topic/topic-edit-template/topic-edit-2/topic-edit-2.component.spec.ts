import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicEditTwoComponent } from './topic-edit-2.component';

describe('TopicEditTwoComponent', () => {
  let component: TopicEditTwoComponent;
  let fixture: ComponentFixture<TopicEditTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicEditTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicEditTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
