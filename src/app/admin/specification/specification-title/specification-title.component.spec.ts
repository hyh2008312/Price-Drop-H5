import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationTitleComponent } from './specification-title.component';

describe('SpecificationTitleComponent', () => {
  let component: SpecificationTitleComponent;
  let fixture: ComponentFixture<SpecificationTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificationTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificationTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
