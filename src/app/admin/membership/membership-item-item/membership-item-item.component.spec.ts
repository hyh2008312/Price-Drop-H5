import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipItemItemComponent } from './membership-item-item.component';

describe('MembershipItemItemComponent', () => {
  let component: MembershipItemItemComponent;
  let fixture: ComponentFixture<MembershipItemItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipItemItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipItemItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
