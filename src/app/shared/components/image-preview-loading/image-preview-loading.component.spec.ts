import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePreviewLoadingComponent } from './image-preview-loading.component';

describe('ImagePreviewLoadingComponent', () => {
  let component: ImagePreviewLoadingComponent;
  let fixture: ComponentFixture<ImagePreviewLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagePreviewLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePreviewLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
