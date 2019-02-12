import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadCategoryComponent } from './image-upload-category.component';

describe('ImageUploadCategoryComponent', () => {
  let component: ImageUploadCategoryComponent;
  let fixture: ComponentFixture<ImageUploadCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUploadCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
