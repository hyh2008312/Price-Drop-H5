import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressMainComponent } from './address-main.component';

describe('AddressMainComponent', () => {
  let component: AddressMainComponent;
  let fixture: ComponentFixture<AddressMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
