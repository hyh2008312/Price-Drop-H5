import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeValueItemComponent } from './attribute-value-item.component';

describe('AttributeValueItemComponent', () => {
  let component: AttributeValueItemComponent;
  let fixture: ComponentFixture<AttributeValueItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeValueItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeValueItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
