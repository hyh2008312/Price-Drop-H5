import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoteProductTitleComponent } from './promote-product-title.component';

describe('PromoteProductTitleComponent', () => {
  let component: PromoteProductTitleComponent;
  let fixture: ComponentFixture<PromoteProductTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoteProductTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoteProductTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
