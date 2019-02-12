import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpHeaderComponent } from './sign-up-header.component';

describe('SignUpHeaderComponent', () => {
  let component: SignUpHeaderComponent;
  let fixture: ComponentFixture<SignUpHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
