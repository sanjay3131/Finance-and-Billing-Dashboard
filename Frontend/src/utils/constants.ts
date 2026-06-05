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
    _id: string;
  };
  itemCategory: string;
  stock: number;
  unit: string;
  isActive: boolean;
}
export interface productType {
  price: number;
  _id: string;
  productName: string;
  product: {
    image: string;
    _id: string;
  };
}

// billing interface
export interface BillItem {
  product: string;
  productName: string;
  quantity: number;
  price: number;
  productCategory: string;
}

// create bill interface
export interface CreateBillInterface {
  Shop: string;
  items: BillItem[];
  totalAmount: number;
  paymentMethod: string;
  status: string;
}

export interface editBillInterface {
  items: BillItem[];
  totalAmount: number;
  customerName?: string;
  customerPhone?: string;
  paymentMethod?: string;
  status?: string;
}

// read bill interface
export interface BillReadItem {
  _id: string;
  product: string | Product;
  productName: string;
  quantity: number;
  price: number;
  productCategory?: string;
}

export interface readBillInterface {
  shop: string;
  billNumber: string;
  billingDate: Date;
  createdAt: Date;
  items: BillReadItem[];
  paymentMethod: "cash" | "upi";
  status: "pending" | "closed";
  totalAmount: number;
  updatedAt: Date;
  _id: string;
}

export interface Shop {
  _id: string;
  ShopName: string;
  ShopAddress: string;
  ShopPhoneNumber: string;
  ShopEmail: string;
  ShopOwnerName: string;
  ShopOwnerPhoneNumber: string;
  ShopOwnerEmail: string;
  ShopProducts: string[];
  CreatedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface AuthShopResponse {
  message: string;
  shop: Shop;
}
export interface editform {
  name: string;
  sellingPrice: number;
  costPrice: number;
  category: string;
  description: string;
  itemCategory: string;
  isActive: boolean;
  stock: number;
  unit: string;
  image: File | null;
}

export interface editAndAddProps {
  editData: editform;
  setEditData: React.Dispatch<
    React.SetStateAction<editAndAddProps["editData"]>
  >;
  imageFile: string | null;
  handelEditData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitForm: (e: React.FormEvent<HTMLFormElement>) => void;
  param?: string;
  handelDeleteProduct?: (id: string) => void;
  componentType: "edit" | "add";
}

export interface expenseDataType {
  shop: string;
  amount: number;
  category: string;
  createdAt: string;
  expenseDate: string;
  updatedAt: string;
  title: string;
  notes: string;
  _id: string;
}

// chart types
// types/chart.types.ts

export type ChartMode = "week" | "month" | "sixMonth" | "custom";

export interface SalesPerDay {
  date: string;
  day?: number;
  totalSales: number;
}

export interface ExpensePerDay {
  date: string;
  day?: number;
  totalExpense: number;
}

export interface ProfitPerDay {
  date: string;
  day?: number;

  totalSales: number;

  totalExpense: number;

  profit: number;

  profitPercentage: string;
}

export interface SalesPerMonth {
  month: number;
  totalSales: number;
}

export interface ExpensePerMonth {
  month: number;
  totalExpense: number;
}

export interface ReportData {
  startDate?: string;

  endDate?: string;

  salesPerDay?: SalesPerDay[];

  perdaySales?: SalesPerDay[];

  expensePerDay?: ExpensePerDay[];

  perdayExpense?: ExpensePerDay[];

  perdayProfit?: ProfitPerDay[];

  salesPerMonth?: SalesPerMonth[];

  expensePerMonth?: ExpensePerMonth[];
}
