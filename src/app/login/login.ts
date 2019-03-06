export class Login {
  access_token : string;
  expire_in : number;
  refresh_token : string;
  scope: string;
  token_type: string;
}

export class SignUp{
  email: any;
  firstName: string;
  id: number;
  lastName: string;
}

export class Store{
  id: number;
  name: string;
  displayName: string;
  owner: any;
  description: string;
  currency: string;
  url: string;
  country: string;
}
