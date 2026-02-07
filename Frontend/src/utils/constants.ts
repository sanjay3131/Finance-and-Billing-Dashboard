export interface RegisterForm {
  shopEmail: string;
  shopPassword: string;
  shopName: string;
  shopAddress: string;
  shopPhone: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  sameAsShop: boolean;
}
// product
export interface Product {
  _id: string;
  name: string;
  category: string;
  sellingPrice: number;
  image: {
    url: string;
    public_id: string;
  };
  itemCategory: string;
  stock: number;
  unit: string;
  isActive: boolean;
}

// billing interface
export interface BillItem {
  product: string;
  quantity: number;
  price: number;
}
