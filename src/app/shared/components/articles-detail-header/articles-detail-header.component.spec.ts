import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesDetailHeaderComponent } from './articles-detail-header.component';

describe('ArticlesDetailHeaderComponent', () => {
  let component: ArticlesDetailHeaderComponent;
  let fixture: ComponentFixture<ArticlesDetailHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesDetailHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesDetailHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
