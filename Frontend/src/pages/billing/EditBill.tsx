import { useParams } from "react-router-dom";
import { getBillById } from "../../services/billingServices";
import { useQuery } from "@tanstack/react-query";
import type { BillItem, readBillInterface } from "../../utils/constants";
import { useState, useEffect } from "react";
import BillingUI from "../../components/ui/BillingUI";

const EditBill = () => {
  const param = useParams();
  console.log(param);
  const [editBillItems, setEditBillItems] = useState<BillItem[]>([]);

  const { data } = useQuery({
    queryKey: ["billById", param.billId],
    queryFn: () => getBillById(param.billId || ""),
  });
  // unwrap axios response: axios returns { data: { message, data: { ... } } }
  const editBillData = data?.data?.data || {};

  useEffect(() => {
    const items = data?.data?.data?.items;
    if (items) {
      setEditBillItems(items);
    }
  }, [data]);

  return (
    <div className="px-4 py-8 bg-primaryBg w-full min-h-screen min-w-75">
      <div>
        <h1 className="text-2xl font-bold text-center mb-4">Edit Bill</h1>
      </div>{" "}
      <BillingUI
        billItems={editBillItems}
        setBillItems={setEditBillItems}
        editBill={true}
        initialPaymentMethod={(editBillData as readBillInterface).paymentMethod}
        initialStatus={(editBillData as readBillInterface).status}
      />
    </div>
  );
};

export default EditBill;
