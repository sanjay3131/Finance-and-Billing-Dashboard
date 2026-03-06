import type { readBillInterface } from "../../utils/constants";
import { formatAmount } from "../../utils/formatNumbers";

const BillDetailsCard = (bill: readBillInterface) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold ">{bill.billNumber}</h1>
      {bill.items.map((item) => {
        const prod = item.product; // could be string or object
        return (
          <div key={item._id} className="flex items-center gap-3 border-b pb-2">
            {prod && typeof prod !== "string" && prod.image?.url && (
              <img
                src={prod.image.url}
                alt={item.productName}
                className="w-10 h-10 object-cover rounded"
              />
            )}
            <div className="flex flex-col">
              <span className="font-semibold">{item.productName}</span>
              <div className=" flex  justify-start items-center gap-2">
                <span>{item.quantity} ×</span>
                <span className="font-bold">{item.price}</span>
              </div>
            </div>
            {/* total */}
            <div className="ml-auto">
              <span className="font-bold">
                {formatAmount(item.quantity * item.price)}
              </span>
            </div>
          </div>
        );
      })}
      {/* total  */}
      <div className="flex justify-end mt-4">
        <span className="font-bold text-lg">
          Total: {formatAmount(bill.totalAmount)}
        </span>
      </div>
    </div>
  );
};

export default BillDetailsCard;
