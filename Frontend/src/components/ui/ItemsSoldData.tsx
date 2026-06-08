import { useQuery } from "@tanstack/react-query";
import { topSellingProducts } from "../../services/reportService";
import { useState } from "react";
import DatePicker from "./DatePicker";
import type { topsellingProductsDataType } from "../../utils/constants";
import CategoryTab from "./CategoryTab";
import { ViewProductsCategory } from "../../services/productService";

type ItemSold = {
  productName: string;
  quantity: number;
  totalSales: number;
};

const ItemsSoldData = ({ productsSold }: { productsSold?: ItemSold[] }) => {
  const [topSellingItemsQuery, setTopSellingItemsQuery] = useState({
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    category: "",
  });
  const { data: topSellingProductsData } = useQuery({
    queryKey: ["topSellingProducts", topSellingItemsQuery],
    queryFn: () => topSellingProducts(topSellingItemsQuery),
  });
  console.log(topSellingProductsData);

  const handleDateChange = (value: { fromDate: string; toDate: string }) => {
    setTopSellingItemsQuery((prev) => ({
      ...prev,
      startDate: value.fromDate,
      endDate: value.toDate,
    }));
  };

  const soldItems = productsSold ?? [];

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: ViewProductsCategory,
  });
  return (
    <div className="rounded-2xl bg-white p-4 shadow-md">
      {/* top selling items */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold mb-2">Top Selling Items</h2>
        <DatePicker
          date={{
            fromDate: topSellingItemsQuery.startDate,
            toDate: topSellingItemsQuery.endDate,
          }}
          setDate={handleDateChange}
        />
        <CategoryTab
          selectedCategory={topSellingItemsQuery.category}
          setSelectedCategory={(category) =>
            setTopSellingItemsQuery((prev) => ({ ...prev, category }))
          }
          Categories={categoriesData?.data?.data || []}
        />

        <div className=" w-full  p-4 rounded-2xl mt-4 flex flex-col items-center justify-center">
          {topSellingProductsData?.data.productsSold.length === 0 ? (
            <p className="text-sm text-gray-500 text-center font-semibold">
              No top selling items are available for the selected period.
            </p>
          ) : (
            topSellingProductsData?.data.productsSold.map(
              (item: topsellingProductsDataType, index: number) => (
                <div
                  key={item.productName}
                  className=" bg-primaryBg p-3 rounded-lg mb-3 shadow-sm flex  flex-col gap-2 w-full lg:w-3/4 md:w-4/5 "
                >
                  <div className="flex justify-between items-center ">
                    <div className="flex gap-2 items-center">
                      <p className=" font-bold bg-blue-800 text-white px-3 py-1 rounded-sm">
                        {index + 1}
                      </p>
                      <p className="font-bold capitalize ">
                        {item.productName}
                      </p>
                    </div>
                    <p className="font-semibold  text-sm bg-yellow-100 rounded-full text-yellow-600 px-4 py-1">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-sm bg-green-200 rounded-full text-green-600 px-4 py-1">
                    Total Sales: ₹{item.totalSales.toFixed(2)}
                  </p>
                </div>
              ),
            )
          )}
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold"> All Items Sold</h3>
        <span className="text-sm text-gray-500">
          {soldItems.length} item{soldItems.length === 1 ? "" : "s"}
        </span>
      </div>

      {soldItems.length === 0 ? (
        <p className="text-sm text-gray-500">
          No sold items are available for the selected period.
        </p>
      ) : (
        <ul className="space-y-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {soldItems.map((item) => (
            <li
              key={`${item.productName}-${item.quantity}`}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-3"
            >
              <div className="flex items-center space-x-3">
                <p className="font-medium text-gray-800 capitalize">
                  {item.productName}
                </p>
                <p className="text-sm text-gray-500 font-semibold ">
                  Qty: {item.quantity}
                </p>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                ₹
                {item.totalSales?.toFixed
                  ? item.totalSales.toFixed(2)
                  : item.totalSales}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemsSoldData;
