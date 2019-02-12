import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCompleteDialogComponent } from './home-complete-dialog.component';

describe('HomeCompleteDialogComponent', () => {
  let component: HomeCompleteDialogComponent;
  let fixture: ComponentFixture<HomeCompleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCompleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCompleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
