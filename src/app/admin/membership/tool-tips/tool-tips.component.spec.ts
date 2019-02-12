import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolTipsComponent } from './tool-tips.component';

describe('ToolTipsComponent', () => {
  let component: ToolTipsComponent;
  let fixture: ComponentFixture<ToolTipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolTipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
