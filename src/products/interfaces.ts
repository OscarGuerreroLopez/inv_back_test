export interface Product {
  name: string;
  contain_articles: {
    art_id: string;
    amount_of: string;
  }[];
}

export type Products = Product[];
