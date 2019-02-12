import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoteMainComponent } from './promote-main.component';

describe('PromoteMainComponent', () => {
  let component: PromoteMainComponent;
  let fixture: ComponentFixture<PromoteMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoteMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoteMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
