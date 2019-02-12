import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordsTitleComponent } from './keywords-title.component';

describe('KeywordsTitleComponent', () => {
  let component: KeywordsTitleComponent;
  let fixture: ComponentFixture<KeywordsTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordsTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordsTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
