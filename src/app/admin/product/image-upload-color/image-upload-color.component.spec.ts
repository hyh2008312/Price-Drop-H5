import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadAdditionalComponent } from './image-upload-additional.component';

describe('ImageUploadAdditionalComponent', () => {
  let component: ImageUploadAdditionalComponent;
  let fixture: ComponentFixture<ImageUploadAdditionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUploadAdditionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
