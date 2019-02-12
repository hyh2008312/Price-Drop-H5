export class ImageConstant{

  IMAGE_UPLOAD_TYPE = {
    'BLOG_COVER':{
      'category': 'blog',
      'use': 'cover',
      'originUrl':'image/blog/cover/',
      'list': 'xy',
      'detail': 'co'
    },
    "BLOG_DETAILS": {
      'category': 'blog',
      'use': 'details',
      'originUrl':'image/blog/details/',
      'detail': 'mo'
    }
  };
}

export class BlogCover{
  category: string = 'blog';
  use: string = 'cover';
  originUrl: string = 'image/blog/cover/';
  list: string =  'xy';
  detail: string = 'co';
}

export class BogDetail{
  category :string = 'blog';
  use: string = 'details';
  originUrl: string = 'image/blog/details/';
  detail: string = 'mo';
}

export class StoreTemplateRouter{
  router = [{
    detail: true,
    blog: false,
    list: true,
    about_me: false
  }, {
    detail: true,
    blog: false,
    list: true,
    about_me: true
  }, {
    detail: true,
    blog: true,
    list: true,
    about_me: true
  }];
}
