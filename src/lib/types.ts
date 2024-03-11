export interface apiValueT {
  action: string;
  params: {
    [key: string]: string | number | string[];
  };
}

export interface ProductT {
  id: string;
  brand: string | null;
  product: string;
  price: number;
}

export type filterT = "all" | "brand" | "name" | "price";
export interface paginateT {
  page: number;
  limit: 10 | 25 | 50 | 100;
}

export interface initialStateReduxT {
  paginate: paginateT;
  paginateF: paginateT;
  query: apiValueT;
  filter: {
    type: filterT;
    value: string | number;
  };
}
