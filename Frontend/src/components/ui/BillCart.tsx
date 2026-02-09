import type { BillItem } from "../../utils/constants";

type BillCartProps = {
  BillingItems: BillItem[];
};

const BillCart = ({ BillingItems }: BillCartProps) => {
  const totalItemsInCart = BillingItems.length;

  const totalBillAmount = (items: BillItem[]) => {
    return items.reduce(
      (sum: number, item: BillItem) => sum + item.quantity * item.price,
      0,
    );
  };

  return (
    <div className="w-full max-w-lg bg-white p-4 rounded-2xl shadow-md">
      {/* subtotal items */}
      <h3 className="font-semibold text-gray-400">
        Subtotal <span>( {totalItemsInCart} items )</span>
      </h3>
      {/* items */}
      <div>
        <div className="flex  gap-4 mb-2  border-b-2  border-dashed border-gray-400 py-2">
          <div className="flex-1">
            <h1 className="font-semibold text-lg">Item Name</h1>
          </div>
          <div className="grid grid-cols-3 flex-2 items-center gap-1  text-center">
            {/* quantity */}
            <h2 className="font-semibold text-lg border-x-2  ">Qty</h2>
            <h2 className="font-semibold text-lg ">Price</h2>
            <h2 className="font-semibold text-lg border-x-2">Total</h2>
          </div>
        </div>

        {totalItemsInCart > 0 ? (
          BillingItems.map((item) => (
            <div className="flex gap-0 justify-between items-center ">
              {/* item name */}
              <div className="flex-1">
                <h1 className="font-semibold capitalize ">
                  {item.productName}{" "}
                </h1>
              </div>

              {/* item quantity and price */}
              <div className="grid grid-cols-3 flex-2 w-full ">
                <h2 className="w-full max-w-36 overflow-x-scroll hide-scrollbar flex justify-between items-centerpx-4">
                  {" "}
                  {item.quantity}
                  <span>*</span>
                </h2>

                <h2 className="w-full max-w-36 overflow-x-scroll hide-scrollbar font-semibold flex justify-between items-center px-4">
                  {item.price}
                  <span>=</span>
                </h2>

                <h2 className="w-full max-w-36 overflow-x-scroll hide-scrollbar font-semibold text-center">
                  {item.quantity * item.price}
                </h2>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 items-center">
            No items in cart
          </div>
        )}
      </div>
      <div className="mt-4">
        <h2 className="font-semibold text-lg border-t-2 border-dashed border-gray-400 pt-2">
          Total Bill Amount : ₹{" "}
          <span className="font-extrabold text-lg">
            {Math.trunc(totalBillAmount(BillingItems))}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default BillCart;
