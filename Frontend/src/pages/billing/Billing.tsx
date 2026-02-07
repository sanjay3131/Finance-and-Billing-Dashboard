import { useQuery } from "@tanstack/react-query";
import { IoSearch } from "react-icons/io5";
import {
  ViewAllProducts,
  ViewProductsCategory,
} from "../../services/productService";
import type { BillItem, Product as productType } from "../../utils/constants";
import { useState } from "react";
import ItemCard from "../../components/ui/ItemCard";

const Billing = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [billItems, setBillItems] = useState<BillItem[]>([]);
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
  console.log(billItems);

  const { data: Products } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () => ViewAllProducts(selectedCategory),
  });

  const { data: Categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => ViewProductsCategory(),
  });
  console.log(Products?.data);
  console.log(Categories);

  return (
    <div className="px-4 py-8 bg-primaryBg w-full min-h-screen min-w-75">
      {/* header */}
      <div>
        <h1 className="text-2xl font-bold text-center">New Bill</h1>
      </div>
      {/* search items */}
      <div>
        <div className="mt-8 w-full flex flex-col gap-4">
          <div className="relative">
            <IoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              className="w-full p-4 pl-12 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          {/* categories */}
          <div className="">
            <div className="flex gap-4 flex-wrap pb-2">
              <button
                onClick={() => setSelectedCategory("")}
                className={`whitespace-nowrap px-4 py-2 rounded-2xl shadow-md transition-all font-bold capitalize  ${
                  selectedCategory === ""
                    ? "bg-green-500 text-white scale-110"
                    : "bg-white"
                }`}
              >
                All
              </button>
              {Categories?.data?.data.map((category: string) => (
                <button
                  onClick={() => setSelectedCategory(category)}
                  key={category}
                  className={`whitespace-nowrap px-4  rounded-2xl shadow-md transition-all font-bold capitalize  ${
                    selectedCategory === category
                      ? "bg-green-500 text-white scale-110"
                      : "bg-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          {/* items list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center max-h-75 overflow-y-auto py-6 px-4 hide-scrollbar">
            {Products?.data.allProducts.map((product: productType) => (
              <ItemCard
                key={product._id}
                product={product}
                onAdd={addItemToBill}
                onRemove={removeItemFromBill}
              />
            ))}
          </div>
          {/*  bill cart */}
          <div className="mt-4 bg-white p-4 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold">Bill Cart</h2>
            <p className="text-gray-500">No items added yet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
