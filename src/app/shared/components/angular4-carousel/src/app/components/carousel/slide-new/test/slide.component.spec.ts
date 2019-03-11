import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SlideNewComponent } from '../';

describe('SlideNewComponent', () => {
  let component: SlideNewComponent;
  let fixture: ComponentFixture<SlideNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideNewComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.src = '';
    component.slideNo = 1;
    component.isHidden = false;
  });

  it('should have img sources', () => {
    expect(component.src).toBe('');
  });

  it('should have slide number', () => {
    expect(component.slideNo).toBe(1);
  });

  it('should have slide number', () => {
    expect(component.isHidden).toBeFalsy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
