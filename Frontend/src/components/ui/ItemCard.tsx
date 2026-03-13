import type { BillItem, Product } from "../../utils/constants";
import { formatAmount } from "../../utils/formatNumbers";

const ItemCard = ({
  product,
  onAdd,
  onRemove,
  quantity,

  onSetQuantity,
}: {
  product: Product;
  quantity: number;

  onAdd: (item: BillItem) => void;
  onRemove: (productId: string) => void;
  onSetQuantity: (
    productId: string,
    quantity: number,
    price: number,
    productName: string,
  ) => void;
}) => {
  console.log("quantity", quantity);

  return (
    <div className="p-2 bg-white  shadow-md rounded-2xl flex gap-4 w-full h-24 justify-center items-center">
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
            if (Number.isNaN(val)) return;

            onSetQuantity(product._id, val, product.sellingPrice, product.name);
          }}
          min={0}
        />
        <button
          onClick={() => {
            onAdd({
              product: product._id,
              productName: product.name,
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
