import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotwordItemComponent } from './hotword-item.component';

describe('HotwordItemComponent', () => {
  let component: HotwordItemComponent;
  let fixture: ComponentFixture<HotwordItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotwordItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotwordItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
