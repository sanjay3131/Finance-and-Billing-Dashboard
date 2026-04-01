import { useAuth } from "../../hooks/useAuth";
import type {
  BillItem,
  CreateBillInterface,
  editBillInterface,
} from "../../utils/constants";
import { CreateBill, useUpdateBill } from "../../services/billingServices";
import { toast } from "sonner";
import { useState } from "react";
import { useParams, useNavigate } from "react-router";

type BillCartProps = {
  BillingItems: BillItem[];
  clearCart: () => void;
  editBill?: boolean;
  initialPaymentMethod?: string;
  initialStatus?: string;
};

const BillCart = ({
  BillingItems,
  clearCart,
  editBill,
  initialPaymentMethod,
  initialStatus,
}: BillCartProps) => {
  const totalItemsInCart = BillingItems.length;

  const totalBillAmount = (items: BillItem[]) => {
    return items.reduce(
      (sum: number, item: BillItem) => sum + item.quantity * item.price,
      0,
    );
  };
  // shop data from auth context
  const { data } = useAuth();
  console.log("auth data", data?.shop);
  const [paymentMethod, setPaymentMethod] = useState(
    editBill && initialPaymentMethod ? initialPaymentMethod : "cash",
  );
  const [billStatus, setBillStatus] = useState(
    editBill && initialStatus ? initialStatus : "pending",
  );

  const createBillMutation = CreateBill();

  // handle create bill
  const handleCreateBill = () => {
    if (!data?.shop?._id) {
      toast.error("Shop not loaded yet");
      return;
    }

    const billData: CreateBillInterface = {
      Shop: data.shop._id,
      items: BillingItems,
      totalAmount: totalBillAmount(BillingItems),
      paymentMethod: paymentMethod,
      status: billStatus,
    };

    createBillMutation.mutate(billData, {
      onSuccess: () => {
        toast.success("Bill created successfully!");
        clearCart();
      },
      onError: () => {
        toast.error("Failed to create bill. Please try again.");
      },
    });
  };

  //
  const updateBillMutation = useUpdateBill();
  const params = useParams();
  const navigate = useNavigate();

  const handelEditBill = () => {
    if (!params.billId) {
      toast.error("No bill id provided");
      return;
    }

    if (!data?.shop?._id) {
      toast.error("Shop not loaded yet");
      return;
    }

    const billDetails: editBillInterface = {
      items: BillingItems,
      paymentMethod,
      status: billStatus,
      totalAmount: totalBillAmount(BillingItems),
    };

    updateBillMutation.mutate(
      {
        id: params.billId,
        billDetails,
      },
      {
        onSuccess: () => {
          toast.success("Bill updated successfully!");
          navigate("/billHistory");
        },
        onError: () => {
          toast.error("Failed to update bill. Please try again.");
        },
      },
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
            <div
              key={item.productName}
              className="flex gap-0 justify-between items-center "
            >
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
      <div className="mt-4 border-b-2 border-dashed border-gray-400  py-4">
        <h2 className="font-semibold text-lg border-t-2 border-dashed border-gray-400 pt-2">
          Total Bill Amount : ₹{" "}
          <span className="font-extrabold text-lg">
            {Math.trunc(totalBillAmount(BillingItems))}
          </span>
        </h2>
      </div>
      {/* status and bill method */}
      <div className="flex items-center justify-evenly gap-2 flex-wrap">
        {/* status */}
        <div>
          <h2 className="font-semibold text-lg mt-4">Payment Method</h2>
          <div className="flex gap-4 mt-2">
            <input
              type="radio"
              id="cash"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
            />
            <label htmlFor="cash">Cash</label>
            <input
              type="radio"
              className=""
              id="upi"
              name="paymentMethod"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={() => setPaymentMethod("upi")}
            />
            <label htmlFor="upi">UPI</label>
          </div>
        </div>
        {/* bill status */}
        <div className=" ">
          <h2 className="font-semibold text-lg mt-4">Bill Status</h2>
          <div className="flex gap-4 mt-2">
            <input
              type="radio"
              id="pending"
              name="billStatus"
              value="pending"
              checked={billStatus === "pending"}
              onChange={() => setBillStatus("pending")}
            />
            <label htmlFor="pending">Pending</label>
            <input
              type="radio"
              id="closed"
              name="billStatus"
              value="closed"
              checked={billStatus === "closed"}
              onChange={() => setBillStatus("closed")}
            />
            <label htmlFor="closed">Paid</label>
          </div>
        </div>
      </div>

      {/* generate bill  */}

      <div>
        {editBill ? (
          <button
            disabled={totalItemsInCart === 0 || updateBillMutation.isPending}
            onClick={handelEditBill}
            className={`w-full bg-blue-500 text-white py-2 rounded-lg mt-4
             hover:bg-blue-600 transition-all duration-300  cursor-pointer font-bold capitalize
             ${
               totalItemsInCart === 0 || updateBillMutation.isPending
                 ? "disabled:opacity-50 disabled:cursor-not-allowed"
                 : ""
             }`}
          >
            {totalItemsInCart === 0
              ? "add Items in Cart"
              : updateBillMutation.isPending
                ? "Updating Bill..."
                : "Save Changes"}
          </button>
        ) : (
          <button
            disabled={totalItemsInCart === 0 || createBillMutation.isPending}
            onClick={() => {
              handleCreateBill();
            }}
            className={`w-full bg-green-500 text-white py-2 rounded-lg mt-4
             hover:bg-green-600 transition-all duration-300  cursor-pointer font-bold capitalize
             ${totalItemsInCart === 0 || createBillMutation.isPending ? "disabled:opacity-50 disabled:cursor-not-allowed" : ""}`}
          >
            {totalItemsInCart === 0
              ? "add Items in Cart"
              : createBillMutation.isPending
                ? "Generating Bill..."
                : "Generate Bill"}
          </button>
        )}
      </div>
    </div>
  );
};

export default BillCart;
