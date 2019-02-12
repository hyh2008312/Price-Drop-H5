import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoteCreateComponent } from './promote-create.component';

describe('PromoteCreateComponent', () => {
  let component: PromoteCreateComponent;
  let fixture: ComponentFixture<PromoteCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoteCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
