import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadMainComponent } from './image-upload-main.component';

describe('ImageUploadMainComponent', () => {
  let component: ImageUploadMainComponent;
  let fixture: ComponentFixture<ImageUploadMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUploadMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
