import { FaMoneyBillWave } from "react-icons/fa6";
import { IoQrCodeSharp, IoShareSocialOutline } from "react-icons/io5";
import { formatAmount } from "../../utils/formatNumbers";
import { LuPrinter } from "react-icons/lu";
import { useUpdateBill } from "../../services/billingServices";
import type { BillItem, readBillInterface } from "../../utils/constants";

const Billcard = ({
  bill,
  setSelectedBill,
  setModalOpen,
}: {
  bill: readBillInterface;
  setSelectedBill: (
    value: React.SetStateAction<readBillInterface | null>,
  ) => void;
  setModalOpen: (value: React.SetStateAction<boolean>) => void;
}) => {
  const updateBillMutation = useUpdateBill();
  const handleToggle = (bill: readBillInterface) => {
    const newStatus = bill.status === "closed" ? "pending" : "closed";

    updateBillMutation.mutate({
      id: bill._id,
      billDetails: {
        ...bill,
        status: newStatus,
        items: bill.items.map(
          (item): BillItem => ({
            product:
              typeof item.product === "string"
                ? item.product
                : item.product._id,
            productName: item.productName,
            quantity: item.quantity,
            price: item.price,
            productCategory:
              item.productCategory ||
              (typeof item.product !== "string"
                ? item.product.category || item.product.itemCategory || ""
                : ""),
          }),
        ),
      },
    });
  };

  return (
    <div className=" bg-white p-1 rounded-xl px-4 py-2 flex flex-col gap-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* payment icon and bill num */}
        <div className="flex gap-4 justify-center items-center">
          {bill.paymentMethod === "cash" ? (
            <span className="text-green-500 p-2 rounded-md bg-green-100 ">
              <FaMoneyBillWave />
            </span>
          ) : bill.paymentMethod === "upi" ? (
            <span className="text-violet-500">
              <IoQrCodeSharp />
            </span>
          ) : null}
          {/* bill number  */}
          <div className="">
            <h1 className="font-semibold text-xs md:text-sm ">
              # {bill.billNumber}
            </h1>
            <h3 className="text-gray-500 text-sm">
              {new Date(bill.updatedAt).toLocaleTimeString()}
            </h3>{" "}
          </div>
        </div>
        {/* bill amount  */}
        <div>
          <h2 className="font-bold text-lg">
            {formatAmount(bill.totalAmount)}
          </h2>
          <button
            onClick={() => handleToggle(bill)}
            className={`px-2 py-1 text-sm capitalize rounded-md flex justify-center items-center hover:scale-105 transition-all duration-150 ease-in-out ${
              bill.status === "pending"
                ? "bg-red-100 text-red-500"
                : updateBillMutation.isPending
                  ? " bg-purple-100 text-purple-500"
                  : "bg-green-100 text-green-500"
            }`}
          >
            {updateBillMutation.isPending ? "loading" : bill.status}
          </button>
        </div>
      </div>
      {/* bill details */}
      <div className="flex  justify-between items-center">
        <div className="flex items-center gap-2">
          <h1>
            <span className="  rounded-full">{bill.items.length}</span> items
          </h1>
        </div>
        <div className="flex gap-5">
          <button>
            <LuPrinter />
          </button>
          <button>
            <IoShareSocialOutline />
          </button>
          <button
            onClick={() => {
              setSelectedBill(bill);
              setModalOpen(true);
            }}
            className=" bg-gray-200 py-1 px-4 rounded-md hover:bg-gray-300 text-gray-400 font-semibold hover:text-gray-800"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billcard;
