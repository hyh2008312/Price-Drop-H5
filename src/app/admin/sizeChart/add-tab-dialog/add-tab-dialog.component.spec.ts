import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTabDialogComponent } from './add-tab-dialog.component';

describe('AddTabDialogComponent', () => {
  let component: AddTabDialogComponent;
  let fixture: ComponentFixture<AddTabDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTabDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTabDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
