import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttentionDialogComponent } from './add-attention-dialog.component';

describe('AddAttentionDialogComponent', () => {
  let component: AddAttentionDialogComponent;
  let fixture: ComponentFixture<AddAttentionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAttentionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttentionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
