import { useQuery } from "@tanstack/react-query";
import { GetAllBills } from "../../services/billingServices";
import { useState } from "react";
import type { BillItem, readBillInterface } from "../../utils/constants";

const BillHistory = () => {
  const today = new Date();
  const [date, setDate] = useState({
    fromDate: new Date(today.getFullYear(), today.getMonth(), 1)
      .toISOString()
      .split("T")[0], // default to first day of current month
    toDate: new Date(today.getFullYear(), today.getMonth() + 1, 0)
      .toISOString()
      .split("T")[0], // default to last day of current month
  });
  console.log(new Date().toISOString());

  const { data } = useQuery({
    queryKey: ["bills", date],
    queryFn: () => GetAllBills(date),
  });
  console.log("bills data", data, date);
  return (
    <div>
      <h1>Bill History</h1>

      <div>
        <label>From Date:</label>
        <input
          type="date"
          value={date.fromDate}
          onChange={(e) => setDate({ ...date, fromDate: e.target.value })}
        />
        <label>To Date:</label>
        <input
          type="date"
          value={date.toDate}
          onChange={(e) => setDate({ ...date, toDate: e.target.value })}
        />
        <button
          onClick={() => {
            setDate({
              fromDate: "2024-06-01",
              toDate: "2026-06-30",
            });
          }}
        >
          Reset Dates
        </button>
      </div>
      <div>
        {data?.data?.data?.map((bill: readBillInterface) => (
          <div key={bill._id} className="border p-4 mb-4 rounded">
            <h2 className="font-bold text-lg">Bill ID: {bill.billNumber}</h2>
            <p>Total Amount: {bill.totalAmount}</p>
            <p>Payment Method: {bill.paymentMethod}</p>
            <p>Status: {bill.status}</p>
            <div>
              <h3 className="font-semibold">Items:</h3>
              <ul className="list-disc list-inside">
                {bill.items.map((item: BillItem, index: number) => (
                  <li key={index}>
                    {item.productName} - Quantity: {item.quantity} - Price:{" "}
                    {item.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillHistory;
