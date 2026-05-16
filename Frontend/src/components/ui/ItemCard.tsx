import type { BillItem, Product } from "../../utils/constants";
import { formatAmount } from "../../utils/formatNumbers";
import dummyImg from "../../assets/dummyProduct.jpg";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ItemCard = ({
  product,
  onAdd,
  onRemove,
  quantity,
  card,
  toogleProductStatus,

  onSetQuantity,
}: {
  product: Product;
  quantity?: number;
  card?: "billing" | "inventory";
  toogleProductStatus?: (product: Product) => void;

  onAdd?: (item: BillItem) => void;
  onRemove?: (productId: string) => void;
  onSetQuantity?: (
    productId: string,
    quantity: number,
    price: number,
    productName: string,
  ) => void;
}) => {
  const Navigate = useNavigate();

  return (
    <div
      className={` px-2 py-1  transition-all duration-300 ease-in-out ${quantity && quantity > 0 ? " shadow-green-300" : ""} shadow-md rounded-2xl flex gap-4 w-full h-fit justify-center items-center ${!product.isActive ? " grayscale-100 disabled:" : "bg-white"}`}
    >
      {/* image */}
      <div>
        <img
          src={product.image?.url ? product.image.url : dummyImg}
          alt=""
          className=" size-13 rounded-xl"
        />
      </div>
      {/* name and price */}
      <div className="mt-2 flex flex-col gap-1 justify-evenly flex-1">
        <h3 className="font-semibold text-sm md:text-lg capitalize">
          {product.name}
        </h3>
        <p className="text-md font-semibold">
          {formatAmount(product.sellingPrice)}
        </p>
      </div>
      {/* increment and decrement buttons */}
      {card === "billing" ? (
        <div className="flex  justify-between gap-2 py-1 px-1 items-center  bg-primaryBg min-w-24 h-12 rounded-md">
          <button
            onClick={() => {
              onRemove?.(product._id);
            }}
            className=" text-xl font-semibold bg-white rounded-sm w-7 "
            disabled={!product.isActive && quantity === 0}
          >
            -
          </button>

          <input
            type="number"
            className="w-8 text-center font-bold text-md focus:outline-none hide-scrollbar"
            value={quantity}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (Number.isNaN(val)) return;

              onSetQuantity?.(
                product._id,
                val,
                product.sellingPrice,
                product.name,
              );
            }}
            min={0}
            disabled={!product.isActive && quantity === 0}
          />
          <button
            disabled={!product.isActive && quantity === 0}
            onClick={() => {
              onAdd?.({
                product: product._id,
                productName: product.name,
                quantity: quantity ? quantity + 1 : 1,
                price: product.sellingPrice,
              });
            }}
            className=" text-xl font-semibold bg-green-400 rounded-sm w-7"
          >
            +
          </button>
        </div>
      ) : (
        <div className="flex gap-4 flex-col justify-center items-center ">
          {/* edit product */}
          <button
            onClick={() => Navigate(`/products/edit/${product._id}`)}
            className="bg-blue-100 rounded-sm  p-2 text-blue-700"
          >
            <FiEdit />
          </button>
          {/* isActive */}
          <button
            onClick={() => toogleProductStatus?.(product)}
            className={`${product.isActive ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"} capitalize py-2 px-4 rounded-md`}
          >
            {product.isActive ? "disable" : "available"}
          </button>
        </div>
      )}
    </div>
  );
};
export default ItemCard;
