import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEditDialogComponent } from './home-edit-dialog.component';

describe('HomeEditDialogComponent', () => {
  let component: HomeEditDialogComponent;
  let fixture: ComponentFixture<HomeEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
