import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordsDetailComponent } from './keywords-detail.component';

describe('KeywordsDetailComponent', () => {
  let component: KeywordsDetailComponent;
  let fixture: ComponentFixture<KeywordsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
