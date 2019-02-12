import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardTitleComponent } from './award-title.component';

describe('AwardTitleComponent', () => {
  let component: AwardTitleComponent;
  let fixture: ComponentFixture<AwardTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwardTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
