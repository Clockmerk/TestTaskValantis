export interface apiValueT {
  action: string;
  params: {
    [key: string]: string | number | string[];
  };
}

export interface Product {
  id: string;
  brand: string | null;
  product: string;
  price: number;
}

export interface initialStateReduxT {
  page: number;
  limit: 10 | 25 | 50 | 100;
  query: apiValueT;
}
