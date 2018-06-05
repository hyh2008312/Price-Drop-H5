import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadPreviewMultiComponent } from './image-upload-preview-multi.component';

describe('ImageUploadPreviewMultiComponent', () => {
  let component: ImageUploadPreviewMultiComponent;
  let fixture: ComponentFixture<ImageUploadPreviewMultiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUploadPreviewMultiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadPreviewMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
