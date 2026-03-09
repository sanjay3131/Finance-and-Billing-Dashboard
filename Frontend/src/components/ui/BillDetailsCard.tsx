import { FaEdit } from "react-icons/fa";
import type { readBillInterface } from "../../utils/constants";
import { formatAmount } from "../../utils/formatNumbers";
import { useNavigate } from "react-router-dom";

interface BillDetailsCardProps {
  bill: readBillInterface;
}

const BillDetailsCard = ({ bill }: BillDetailsCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-5 ">
        <h1 className="font-bold ">{bill.billNumber}</h1>
        <span
          className={`px-2 py-1 text-sm capitalize rounded-md flex justify-center items-center hover:scale-105 transition-all duration-150 ease-in-out ${
            bill.status === "pending"
              ? "bg-red-100 text-red-500"
              : "bg-green-100 text-green-500"
          }`}
        >
          {bill.status}
        </span>
      </div>
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
                <span className="font-bold ">{formatAmount(item.price)}</span>
              </div>
            </div>
            {/* total */}
            <div className="ml-auto">
              <span className="font-semibold">
                {formatAmount(item.quantity * item.price)}
              </span>
            </div>
          </div>
        );
      })}
      {/* total  and edit bill */}
      <div
        onClick={() => navigate(`/billing/edit/${bill._id}`)}
        className="flex justify-between mt-4"
      >
        <span className="flex justify-center items-center gap-1 text-gray-500 hover:text-gray-700 cursor-pointer">
          Edit bill <FaEdit className="inline ml-1 text-gray-500" />
        </span>
        <span className="font-bold text-lg">
          Total: {formatAmount(bill.totalAmount)}
        </span>
      </div>
    </div>
  );
};

export default BillDetailsCard;
