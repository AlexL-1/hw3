export type Category = {
  id: string;
  name: string;
  image: string;
  creationAt: string; //"2024-04-18T20:15:40.000Z"
  updatedAt: string;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string; //"2024-04-18T20:15:40.000Z"
  updatedAt: string;
};
