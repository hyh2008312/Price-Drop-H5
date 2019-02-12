import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordsItemComponent } from './keywords-item.component';

describe('KeywordsItemComponent', () => {
  let component: KeywordsItemComponent;
  let fixture: ComponentFixture<KeywordsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
