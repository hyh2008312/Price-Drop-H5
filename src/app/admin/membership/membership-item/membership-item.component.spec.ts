import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipItemComponent } from './membership-item.component';

describe('MembershipItemComponent', () => {
  let component: MembershipItemComponent;
  let fixture: ComponentFixture<MembershipItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
