export type Category = {
  id: number;
  name: string;
  image: string;
  creationAt: string; //"2024-04-18T20:15:40.000Z"
  updatedAt: string; //"2024-04-18T20:15:40.000Z"
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string;
  creationAt: string; //"2024-04-18T20:15:40.000Z"
  updatedAt: string; //"2024-04-18T20:15:40.000Z"
};
