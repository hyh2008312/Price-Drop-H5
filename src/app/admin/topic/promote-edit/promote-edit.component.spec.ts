import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoteEditComponent } from './promote-edit.component';

describe('PromoteEditComponent', () => {
  let component: PromoteEditComponent;
  let fixture: ComponentFixture<PromoteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
