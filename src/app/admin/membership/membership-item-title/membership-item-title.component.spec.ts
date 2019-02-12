import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipTitleComponent } from './category-title.component';

describe('MembershipTitleComponent', () => {
  let component: MembershipTitleComponent;
  let fixture: ComponentFixture<MembershipTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
