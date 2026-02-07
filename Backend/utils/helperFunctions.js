export const normalizeItems = (items) => {
  const map = new Map();

  for (const item of items) {
    const key = item.product.toString();

    if (map.has(key)) {
      map.get(key).quantity += item.quantity;
    } else {
      map.set(key, { ...item });
    }
  }

  return Array.from(map.values());
};

// total calculation
export const calculateTotal = (items) =>
  items.reduce((sum, i) => sum + i.quantity * i.price, 0);
