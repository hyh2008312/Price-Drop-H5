import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressTitleComponent } from './address-title.component';

describe('AddressTitleComponent', () => {
  let component: AddressTitleComponent;
  let fixture: ComponentFixture<AddressTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
