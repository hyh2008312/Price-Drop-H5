import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationMainComponent } from './specification-main.component';

describe('SpecificationMainComponent', () => {
  let component: SpecificationMainComponent;
  let fixture: ComponentFixture<SpecificationMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificationMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificationMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
