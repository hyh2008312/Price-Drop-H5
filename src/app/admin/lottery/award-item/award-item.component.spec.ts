import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardItemComponent } from './award-item.component';

describe('AwardItemComponent', () => {
  let component: AwardItemComponent;
  let fixture: ComponentFixture<AwardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwardItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
