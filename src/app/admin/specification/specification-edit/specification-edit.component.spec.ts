import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationEditComponent } from './specification-edit.component';

describe('SpecificationEditComponent', () => {
  let component: SpecificationEditComponent;
  let fixture: ComponentFixture<SpecificationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
