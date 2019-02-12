import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordsDetailTitleComponent } from './keywords-detail-title.component';

describe('KeywordsDetailTitleComponent', () => {
  let component: KeywordsDetailTitleComponent;
  let fixture: ComponentFixture<KeywordsDetailTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordsDetailTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordsDetailTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
