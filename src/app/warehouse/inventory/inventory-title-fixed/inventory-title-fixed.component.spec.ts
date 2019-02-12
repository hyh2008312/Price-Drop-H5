import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTitleFixedComponent } from './inventory-title-fixed.component';

describe('HomeTitleFixedComponent', () => {
  let component: HomeTitleFixedComponent;
  let fixture: ComponentFixture<HomeTitleFixedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTitleFixedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTitleFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
