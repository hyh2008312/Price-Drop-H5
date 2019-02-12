export class Shop {
  id : number;
  title : string;
  details : string;
  description: string;
  created: string;
  cover: string;
}

export class RecommendProduct {
  categoryId : number;
  categoryName : string;
  createdTime : string;
  description : string;
  id : number;
  imageUrl : any = [];
  isUser : boolean;
  modifiedTime : string;
  originalPrice: OriginalPrice;
  purchaseUrl : string;
  recommendation : string;
  salePrice: SalePrice;
  source : string;
  tags : string;
  title: string;
  category: string;
}

export class OriginalPrice {
  amount : number;
  currency : string;
}

export class SalePrice {
  amount : number;
  currency : string;
}

export class Product {
  id: number;
  name: string;
  title: string;
  description: string;
  status: string;
  created: string;
  tags: string;
  categoryId: number;
  categoryName: string;
  owner: any;
  salePrice: any = 0;
  originalPrice: any = 0;
  cover: any;
  isDraft: boolean;
}

export class StoreProduct{
  id: number;
  productId: number;
  status: string;
  categoryId: number;
  categoryName: string;
  created: string;
  name: string;
  title: string;
  recommendation: string;
  description: string;
  tags: string;
  owner: any;
  product: Product;

  cover: any;
  storeId: number;
  purchaseUrl: string;
  isCustomer: boolean;
  isDraft: boolean;
  isUser: boolean;
}

export class Email{
  email: string;
}

export class Store{
  id : number;
  name : string;
  description: string;
  cover: string;
  ownerId: any;
  ownerAvatar: string;
  ownerCountry: string;
  ownerFirstName: string;
  ownerLastName: string;
  ownerBiography: string;
  category: any;
  nameTag: any;
  titleTag: any;
  descriptionTag: any;
  userTag: any;
  imageUrl: any;
  status: any;
  currency: string;

  uid: any;
  templateId: any;
  context: any;
  image: any;

  displayName: string;
}

export class Image{
  id: number;
  url: string = '';
}

export class UserProfile{
  firstName: string;
  lastName: string;
  country: string;
  biography: string;
  avatar : string;
}

export class StoreStatistic{
  clickTotal : number = 0;
  listingTotal : number = 0;
  storeId : string;
  viewTotal : number = 0;
  visitorTotal : number = 0;
}
