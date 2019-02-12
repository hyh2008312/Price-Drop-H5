import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicCreateOneComponent } from './topic-create-1.component';

describe('TopicCreateOneComponent', () => {
  let component: TopicCreateOneComponent;
  let fixture: ComponentFixture<TopicCreateOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicCreateOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicCreateOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
