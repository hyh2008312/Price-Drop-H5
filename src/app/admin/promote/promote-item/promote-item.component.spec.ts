import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoteItemComponent } from './promote-item.component';

describe('PromoteItemComponent', () => {
  let component: PromoteItemComponent;
  let fixture: ComponentFixture<PromoteItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoteItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
