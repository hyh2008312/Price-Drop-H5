import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWrongDialogComponent } from './home-wrong-dialog.component';

describe('HomeWrongDialogComponent', () => {
  let component: HomeWrongDialogComponent;
  let fixture: ComponentFixture<HomeWrongDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeWrongDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeWrongDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
