import { useParams } from "react-router-dom";
import { getBillById } from "../../services/billingServices";
import { useQuery } from "@tanstack/react-query";
import type { BillItem } from "../../utils/constants";
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

  useEffect(() => {
    if (data?.data?.items) {
      setEditBillItems(data.data.items);
    }
  }, [data]);

  console.log("edit data: ", data);

  return (
    <div>
      EditBill
      <BillingUI billItems={editBillItems} setBillItems={setEditBillItems} />
    </div>
  );
};

export default EditBill;
