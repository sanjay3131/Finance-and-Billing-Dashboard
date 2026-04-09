import type { Product } from "../utils/constants";

export const useSearch = (items: Product[], searchTerm: string) => {
  return items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
};
