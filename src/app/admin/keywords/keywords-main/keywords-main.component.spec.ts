import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordsMainComponent } from './keywords-main.component';

describe('KeywordsMainComponent', () => {
  let component: KeywordsMainComponent;
  let fixture: ComponentFixture<KeywordsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
