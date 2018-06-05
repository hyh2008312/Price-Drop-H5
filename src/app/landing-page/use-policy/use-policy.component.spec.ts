import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsePolicyComponent } from './use-policy.component';

describe('UsePolicyComponent', () => {
  let component: UsePolicyComponent;
  let fixture: ComponentFixture<UsePolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsePolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
