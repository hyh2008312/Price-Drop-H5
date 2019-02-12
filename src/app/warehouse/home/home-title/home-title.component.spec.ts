import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTitleComponent } from './home-title.component';

describe('HomeTitleComponent', () => {
  let component: HomeTitleComponent;
  let fixture: ComponentFixture<HomeTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
