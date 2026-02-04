import { useQuery } from "@tanstack/react-query";
import { IoSearch } from "react-icons/io5";
import {
  ViewAllProducts,
  ViewProductsCategory,
} from "../../services/productService";
import type { Product as productType } from "../../utils/constants";
import { useState } from "react";
import ItemCard from "../../components/ui/ItemCard";

const Billing = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

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
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 justify-items-center ">
            {Products?.data.allProducts.map((product: productType) => (
              <ItemCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
