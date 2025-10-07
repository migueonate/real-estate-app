export type PropertyFilters = {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
};

export type Property = {
  id: string;
  name: string;
  address: string;
  price: number;
  image: string;
};
