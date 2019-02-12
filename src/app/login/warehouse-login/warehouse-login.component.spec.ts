import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseLoginComponent } from './warehouse-login.component';

describe('WarehouseLoginComponent', () => {
  let component: WarehouseLoginComponent;
  let fixture: ComponentFixture<WarehouseLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
