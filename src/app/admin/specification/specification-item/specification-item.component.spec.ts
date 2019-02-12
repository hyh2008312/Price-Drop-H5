import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationItemComponent } from './specification-item.component';

describe('SpecificationItemComponent', () => {
  let component: SpecificationItemComponent;
  let fixture: ComponentFixture<SpecificationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
