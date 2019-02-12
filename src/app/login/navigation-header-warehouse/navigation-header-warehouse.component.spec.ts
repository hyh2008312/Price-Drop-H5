import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationHeaderWarehouseComponent } from './navigation-header-warehouse.component';

describe('NavigationHeaderWarehouseComponent', () => {
  let component: NavigationHeaderWarehouseComponent;
  let fixture: ComponentFixture<NavigationHeaderWarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationHeaderWarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationHeaderWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
