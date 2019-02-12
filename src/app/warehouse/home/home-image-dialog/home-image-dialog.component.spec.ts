import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeImageDialogComponent } from './home-image-dialog.component';

describe('HomeImageDialogComponent', () => {
  let component: HomeImageDialogComponent;
  let fixture: ComponentFixture<HomeImageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeImageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
