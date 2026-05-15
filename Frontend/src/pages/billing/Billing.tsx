import type { BillItem } from "../../utils/constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BillingUI from "../../components/ui/BillingUI";

const STORAGE_KEY = "billing_cart_items";

const getInitialBillItems = (): BillItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as BillItem[]) : [];
  } catch {
    return [];
  }
};

const Billing = () => {
  const navigate = useNavigate();
  const [billItems, setBillItems] = useState<BillItem[]>(getInitialBillItems);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(billItems));
  }, [billItems]);

  return (
    <div className="px-4 py-8 bg-primaryBg w-full min-h-screen min-w-75">
      {/* header */}
      <div className=" flex  gap-4 justify-start items-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 px-4 py-2 rounded-lg"
        >
          Back
        </button>
        <h1 className="text-2xl font-bold text-center">New Bill</h1>
      </div>
      {/* search items */}
      <BillingUI billItems={billItems} setBillItems={setBillItems} />
    </div>
  );
};

export default Billing;
