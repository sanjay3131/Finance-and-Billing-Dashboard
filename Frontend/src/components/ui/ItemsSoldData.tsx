type ItemSold = {
  productName: string;
  quantity: number;
  totalSales: number;
};

const ItemsSoldData = ({ productsSold }: { productsSold?: ItemSold[] }) => {
  const soldItems = productsSold ?? [];

  return (
    <div className="rounded-2xl bg-white p-4 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Items Sold</h3>
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
                <p className="font-medium text-gray-800">{item.productName}</p>
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
