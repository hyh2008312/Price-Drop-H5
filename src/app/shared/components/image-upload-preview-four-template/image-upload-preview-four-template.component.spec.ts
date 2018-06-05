import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadPreviewFourTemplateComponent } from './image-upload-preview-four-template.component';

describe('ImageUploadPreviewFourTemplateComponent', () => {
  let component: ImageUploadPreviewFourTemplateComponent;
  let fixture: ComponentFixture<ImageUploadPreviewFourTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUploadPreviewFourTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadPreviewFourTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
