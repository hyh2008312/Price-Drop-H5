import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePreviewMultiComponent } from './image-preview-multi.component';

describe('ImagePreviewMultiComponent', () => {
  let component: ImagePreviewMultiComponent;
  let fixture: ComponentFixture<ImagePreviewMultiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagePreviewMultiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePreviewMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
