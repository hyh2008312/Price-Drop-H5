import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadPreviewTwoTemplateComponent } from './image-upload-preview-two-template.component';

describe('ImageUploadPreviewTwoTemplateComponent', () => {
  let component: ImageUploadPreviewTwoTemplateComponent;
  let fixture: ComponentFixture<ImageUploadPreviewTwoTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUploadPreviewTwoTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadPreviewTwoTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
