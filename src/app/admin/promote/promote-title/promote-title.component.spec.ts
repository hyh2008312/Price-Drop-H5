import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoteTitleComponent } from './promote-title.component';

describe('PromoteTitleComponent', () => {
  let component: PromoteTitleComponent;
  let fixture: ComponentFixture<PromoteTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoteTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoteTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
