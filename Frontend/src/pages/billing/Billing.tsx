import type { BillItem } from "../../utils/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BillingUI from "../../components/ui/BillingUI";

const Billing = () => {
  const navigate = useNavigate();
  const [billItems, setBillItems] = useState<BillItem[]>([]);

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
