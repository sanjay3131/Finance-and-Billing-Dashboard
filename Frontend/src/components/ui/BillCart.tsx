import type { BillItem } from "../../utils/constants";

type BillCartProps = {
  BillingItems: BillItem[];
};

const BillCart = ({ BillingItems }: BillCartProps) => {
  return (
    <div>
      {BillingItems.map((item) => (
        <p key={item.product}>
          {item.productName} - {item.quantity}
        </p>
      ))}
    </div>
  );
};

export default BillCart;
