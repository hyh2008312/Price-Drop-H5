import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadPreviewBlogComponent } from './image-upload-preview-blog.component';

describe('ImageUploadPreviewBlogComponent', () => {
  let component: ImageUploadPreviewBlogComponent;
  let fixture: ComponentFixture<ImageUploadPreviewBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUploadPreviewBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadPreviewBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
