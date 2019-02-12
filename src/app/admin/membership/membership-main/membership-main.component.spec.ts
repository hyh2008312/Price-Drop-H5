import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipMainComponent } from './membership-main.component';

describe('MembershipMainComponent', () => {
  let component: MembershipMainComponent;
  let fixture: ComponentFixture<MembershipMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
