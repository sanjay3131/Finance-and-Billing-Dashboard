import React, { useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import {
  ViewAllProducts,
  ViewProductsCategory,
} from "../../services/productService";
import { useQuery } from "@tanstack/react-query";
import type { BillItem, Product } from "../../utils/constants";
import ItemCard from "./ItemCard";
import BillCart from "./BillCart";
import CategoryTab from "./CategoryTab";
import { useSearch } from "../../hooks/customeHooks";
import BillCardSkeleton from "./skeleton/BillCardSkeleton";

const BillingUI = ({
  billItems,
  setBillItems,
  editBill,
  initialPaymentMethod,
  initialStatus,
}: {
  billItems: BillItem[];
  setBillItems: React.Dispatch<React.SetStateAction<BillItem[]>>;
  editBill?: boolean;
  initialPaymentMethod?: string;
  initialStatus?: string;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  // add bill
  const addItemToBill = (billItem: BillItem) => {
    setBillItems((prevBillItems) => {
      const existingItem = prevBillItems.find(
        (item) => item.product === billItem.product,
      );
      if (existingItem) {
        return prevBillItems.map((item) =>
          item.product === billItem.product
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevBillItems, billItem];
    });
  };

  const removeItemFromBill = (productId: string) => {
    setBillItems((prevBillItems) =>
      prevBillItems
        .map((item) =>
          item.product === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const setItemQuantity = (
    productId: string,
    quantity: number,
    price: number,
    productName: string,
  ) => {
    setBillItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.product !== productId);
      }

      const exists = prev.find((item) => item.product === productId);

      if (exists) {
        return prev.map((item) =>
          item.product === productId ? { ...item, quantity } : item,
        );
      }

      return [...prev, { product: productId, quantity, price, productName }];
    });
  };

  console.log("billItems: *****", billItems);

  const { data: Products, isLoading: isProductsLoading } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () => ViewAllProducts(selectedCategory),
  });

  const { data: Categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => ViewProductsCategory(),
  });
  console.log(Categories);

  // search and filter
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = useSearch(
    Products?.data?.allProducts || [],
    searchTerm,
  );

  return (
    <div className="w-full">
      <div className="mt-8 w-full min-h-screen flex flex-col gap-4   ">
        {/* search bar */}
        <div className="relative">
          <IoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            value={searchTerm}
            onChange={handleSearchChange}
            type="text"
            placeholder="Search items..."
            className="w-full p-1 pl-12 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          {/* clear search */}
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-5 top-2 transform  text-gray-400 hover:text-gray-600 w-fit text-center"
            >
              <IoClose className="text-xl bg-red-100 text-red-500 rounded-sm " />
            </button>
          )}
        </div>
        {/* categories */}
        <CategoryTab
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          Categories={Categories?.data?.data || []}
        />
        {/* billing section */}
        <div className="flex flex-col ">
          {/* items list */}
          {isProductsLoading ? (
            <BillCardSkeleton />
          ) : (
            <div className="  grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center max-h-75 overflow-y-auto  px-2 py-1 hide-scrollbar">
              {filteredProducts?.map((product: Product) => (
                <ItemCard
                  key={product._id}
                  product={product}
                  onAdd={addItemToBill}
                  onRemove={removeItemFromBill}
                  onSetQuantity={setItemQuantity}
                  card="billing"
                  quantity={
                    billItems.find((item) => item.product === product._id)
                      ?.quantity || 0
                  }
                />
              ))}
            </div>
          )}
          {/*  bill cart */}
          <div className=" py-6 flex justify-center items-center">
            <BillCart
              BillingItems={billItems}
              clearCart={() => setBillItems([])}
              editBill={editBill}
              initialPaymentMethod={initialPaymentMethod}
              initialStatus={initialStatus}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingUI;
