import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipCreateComponent } from './membership-create.component';

describe('MembershipCreateComponent', () => {
  let component: MembershipCreateComponent;
  let fixture: ComponentFixture<MembershipCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
