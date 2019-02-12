import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordsDetailItemComponent } from './keywords-detail-item.component';

describe('KeywordsDetailItemComponent', () => {
  let component: KeywordsDetailItemComponent;
  let fixture: ComponentFixture<KeywordsDetailItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordsDetailItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordsDetailItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
