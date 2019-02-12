import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotwordTitleComponent } from './hotword-title.component';

describe('HotwordTitleComponent', () => {
  let component: HotwordTitleComponent;
  let fixture: ComponentFixture<HotwordTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotwordTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotwordTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
