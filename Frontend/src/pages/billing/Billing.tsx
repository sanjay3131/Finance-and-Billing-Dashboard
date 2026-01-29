import { useQuery } from "@tanstack/react-query";
import { IoSearch } from "react-icons/io5";
import {
  ViewAllProducts,
  ViewProductsCategory,
} from "../../services/productService";
import { formatAmount } from "../../utils/formatNumbers";
import type { Product as productType } from "../../utils/constants";

const Billing = () => {
  const { data: Products } = useQuery({
    queryKey: ["products"],
    queryFn: () => ViewAllProducts(),
  });

  const { data: Categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => ViewProductsCategory(),
  });
  console.log(Products?.data);
  console.log(Categories);

  return (
    <div className="px-4 py-8 bg-primaryBg w-full min-h-screen">
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
          <div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {Categories?.data?.data.map((category: string) => (
                <button className="whitespace-nowrap px-4 py-2 bg-white rounded-2xl shadow-md">
                  {category}
                </button>
              ))}
            </div>
          </div>
          {/* items list */}
          <div className="flex flex-col gap-4 min-h-96 overflow-y-auto bg-yellow-300">
            {Products?.data.allProducts.map((product: productType) => (
              <div
                key={product._id}
                className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-md"
              >
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                </div>
                <span className="font-semibold ">
                  {formatAmount(product.sellingPrice)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
