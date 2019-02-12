import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCreateDialogComponent } from './home-create-dialog.component';

describe('HomeCreateDialogComponent', () => {
  let component: HomeCreateDialogComponent;
  let fixture: ComponentFixture<HomeCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
