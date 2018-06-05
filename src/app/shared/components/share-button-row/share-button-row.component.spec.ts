import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareButtonRowComponent } from './share-button-row.component';

describe('ShareButtonRowComponent', () => {
  let component: ShareButtonRowComponent;
  let fixture: ComponentFixture<ShareButtonRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareButtonRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareButtonRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
