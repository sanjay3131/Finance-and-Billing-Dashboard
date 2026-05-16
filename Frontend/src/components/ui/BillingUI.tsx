import React, { useEffect, useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import {
  ViewAllProducts,
  ViewProductsCategory,
} from "../../services/productService";
import { useQuery } from "@tanstack/react-query";
import type {
  BillItem,
  Product,
  readBillInterface,
} from "../../utils/constants";
import ItemCard from "./ItemCard";
import BillCart from "./BillCart";
import CategoryTab from "./CategoryTab";
import { useSearch } from "../../hooks/customeHooks";
import BillCardSkeleton from "./skeleton/BillCardSkeleton";
import { GetAllBills } from "../../services/billingServices";
import Billcard from "./Billcard";
import BillDetailsCard from "./BillDetailsCard";

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
  const today = new Date();
  const isoToday = today.toISOString().split("T")[0];
  const [date] = useState({
    // default from/to both set to today's date (start and end of current day)
    fromDate: isoToday,
    toDate: isoToday,
  });
  const [modalOpen, setModalOpen] = useState(true);
  const [selectedBill, setSelectedBill] = useState<readBillInterface | null>(
    null,
  );
  const { data, isLoading } = useQuery({
    queryKey: ["bills", date],
    queryFn: () => {
      // ensure toDate covers end of selected day so today's bills are included
      const payload = {
        fromDate: date.fromDate,
        toDate: `${date.toDate}T23:59:59.999Z`,
      };
      return GetAllBills(payload);
    },
  });
  const bills = data?.data || [];
  console.log("bills data", bills, date);

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

  const { data: Products, isLoading: isProductsLoading } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () => ViewAllProducts(selectedCategory),
  });

  // store products locally to avoid refetching when switching categories
  const [localProducts, setLocalProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (Products?.data?.allProducts) {
      localStorage.setItem(
        "products",
        JSON.stringify(Products.data.allProducts),
      );
      setLocalProducts(
        localStorage.getItem("products")
          ? JSON.parse(localStorage.getItem("products")!)
          : [],
      );
    }
  }, [Products]);
  const { data: Categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => ViewProductsCategory(),
  });

  // search and filter
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = useSearch(localProducts, searchTerm);

  return (
    <div className="w-full">
      <div className="mt-8 w-full min-h-screen flex flex-col gap-4   ">
        {modalOpen && selectedBill && (
          <div
            className="fixed top-0 left-0 p-6 bg-black/20 backdrop-blur-sm z-10 flex justify-center items-center min-h-full max-w-full min-w-full overflow-y-auto "
            onClick={() => {
              setModalOpen(false);
              setSelectedBill(null);
            }}
          >
            <div
              className="bg-white/80 backdrop-blur-sm max-w-lg w-full p-4 z-20
            shadow-lg rounded-lg relative overflow-y-auto max-h-[90vh] hide-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setModalOpen(false);
                  setSelectedBill(null);
                }}
                className="absolute top-2 right-2 text-lg text-red-500 hover:text-red-700  bg-red-100 hover:bg-red-200 rounded-full w-8 h-8 flex justify-center items-center transition-all duration-300 ease-in-out"
              >
                x
              </button>
              {selectedBill && (
                <BillDetailsCard
                  bill={selectedBill}
                  setModelOpen={setModalOpen}
                />
              )}
            </div>
          </div>
        )}
        {/* search bar */}
        <div className="relative z-0">
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
            <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center max-h-75 overflow-y-auto  px-2 py-1 hide-scrollbar">
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

          {/* recent bills */}
          <div>
            <div className="">
              <h2 className="font-semibold text-lg ">Recent Bills</h2>
              {isLoading ? (
                <BillCardSkeleton />
              ) : (
                <div className=" p-4 rounded-lg flex flex-col  gap-2">
                  <h1 className="font-semibold text-gray-500 text-md  mb-3">
                    Total Bill :
                    {
                      <span className="font-bold text-black text-xl">
                        {bills?.data?.length || 0}
                      </span>
                    }
                  </h1>
                  {/* bill card  grid*/}
                  {bills?.data && bills.data.length > 0 ? (
                    <div className="   hide-scrollbar grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
                      {bills.data.map((bill: readBillInterface) => (
                        <Billcard
                          key={bill._id}
                          bill={bill}
                          setSelectedBill={setSelectedBill}
                          setModalOpen={setModalOpen}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className=" ">
                      <p className="text-xl font-semibold text-gray-500 text-center py-10">
                        No bills available
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingUI;
