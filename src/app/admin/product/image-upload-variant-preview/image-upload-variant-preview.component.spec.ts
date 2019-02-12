import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadVariantPreviewComponent } from './image-upload-variant-preview.component';

describe('ImageUploadVariantPreviewComponent', () => {
  let component: ImageUploadVariantPreviewComponent;
  let fixture: ComponentFixture<ImageUploadVariantPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUploadVariantPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadVariantPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
