import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingCreateDialogComponent } from './tracking-create-dialog.component';

describe('TrackingCreateDialogComponent', () => {
  let component: TrackingCreateDialogComponent;
  let fixture: ComponentFixture<TrackingCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
