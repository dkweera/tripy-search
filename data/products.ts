export type Product = {
  id: number;
  name: string;
  price: number;
};

export const products: Product[] = Array.from(
  { length: 900 },
  (_, i) => ({
    id: i,
    name: `Product ${i}`,
    price: Math.floor(Math.random() * 1000),
  })
);
