export interface IProductListData {
  title: string;
  price: string;
  original_price?: string;
  currency_id: "UYU" | "USD";
  thumbnail: string;
  shipping: {
    free_shipping: boolean;
  };
}

export interface IProductCard {
  title: string;
  price: string;
  original_price?: string;
  currency_id: "UYU" | "USD";
  thumbnail: string;

  free_shipping: boolean;
}
