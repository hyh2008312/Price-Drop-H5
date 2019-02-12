import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadVariantComponent } from './image-upload-variant.component';

describe('ImageUploadVariantComponent', () => {
  let component: ImageUploadVariantComponent;
  let fixture: ComponentFixture<ImageUploadVariantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUploadVariantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
