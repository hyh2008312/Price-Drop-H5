import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqDialogComponent } from './faq-dialog.component';

describe('FaqDialogComponent', () => {
  let component: FaqDialogComponent;
  let fixture: ComponentFixture<FaqDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
