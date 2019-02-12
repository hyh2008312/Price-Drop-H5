import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadHeaderComponent } from './image-upload-header.component';

describe('ImageUploadPreviewComponent', () => {
  let component: ImageUploadHeaderComponent;
  let fixture: ComponentFixture<ImageUploadHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUploadHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
