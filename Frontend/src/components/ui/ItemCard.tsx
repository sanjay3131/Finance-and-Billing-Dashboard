import { useState } from "react";
import type { BillItem, Product as ProductType } from "../../utils/constants";
import { formatAmount } from "../../utils/formatNumbers";

const ItemCard = ({
  product,
  onAdd,
  onRemove,
}: {
  product: ProductType;
  onAdd: (item: BillItem) => void;
  onRemove: (productId: string) => void;
}) => {
  const [quantity, setQuantity] = useState<number>(0);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };
  return (
    <div className="p-2 bg-white  shadow-md rounded-2xl flex gap-4 w-full justify-center items-center">
      {/* image */}
      <div>
        <img src={product.image.url} alt="" className=" size-20 rounded-xl" />
      </div>
      {/* name and price */}
      <div className="mt-2 flex flex-col gap-1 justify-evenly flex-1">
        <h3 className="font-bold text-xl capitalize">{product.name}</h3>
        <p className="text-md font-semibold">
          {formatAmount(product.sellingPrice)}
        </p>
      </div>
      {/* increment and decrement buttons */}
      <div className="flex  justify-between gap-2 py-1 px-1 items-center  bg-primaryBg min-w-24 h-10 rounded-md">
        <button
          onClick={() => {
            decrementQuantity();
            onRemove(product._id);
          }}
          className=" text-xl font-semibold bg-white rounded-sm w-7"
        >
          -
        </button>

        <input
          type="number"
          className="w-16 text-center font-bold text-lg focus:outline-none hide-scrollbar"
          value={quantity}
          onChange={(e) => {
            const val = Number(e.target.value);
            setQuantity(val < 0 ? 0 : val);
            onAdd({
              product: product._id,
              quantity: quantity,
              price: product.sellingPrice,
            });
          }}
          min={0}
        />
        <button
          onClick={() => {
            incrementQuantity();
            onAdd({
              product: product._id,
              quantity: quantity + 1,
              price: product.sellingPrice,
            });
          }}
          className=" text-xl font-semibold bg-green-400 rounded-sm w-7"
        >
          +
        </button>
      </div>
    </div>
  );
};
export default ItemCard;
