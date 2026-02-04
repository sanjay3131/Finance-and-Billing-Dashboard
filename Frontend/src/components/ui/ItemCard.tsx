import type { Product as ProductType } from "../../utils/constants";
import { formatAmount } from "../../utils/formatNumbers";

const ItemCard = ({ product }: { product: ProductType }) => {
  return (
    <div className="px-2 py-4 bg-amber-300 rounded-2xl flex gap-2 w-full">
      {/* image */}
      <div>
        <img src={product.image.url} alt="" className=" size-20 rounded-2xl" />
      </div>
      {/* name and price */}
      <div className="mt-2 flex flex-col gap-1 justify-between flex-1">
        <h3 className="font-bold text-xl capitalize">{product.name}</h3>
        <p className="text-md font-semibold">
          {formatAmount(product.sellingPrice)}
        </p>
      </div>
      {/* increment and decrement buttons */}
    </div>
  );
};
export default ItemCard;
