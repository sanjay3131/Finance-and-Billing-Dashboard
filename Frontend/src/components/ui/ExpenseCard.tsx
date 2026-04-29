import { MdDelete, MdModeEdit } from "react-icons/md";
import { formatAmount } from "../../utils/formatNumbers";
import dummyImage from "../../assets/dummyProduct.jpg";
import type { expenseDataType } from "../../utils/constants";

const ExpenseCard = (expense: expenseDataType) => {
  return (
    <div className="">
      {/* card */}
      <div className="px-2 py-3 bg-white w-full rounded-xl flex gap-2 shadow-md">
        {/* icon */}
        <img src={dummyImage} className=" size-12 rounded-xl" alt="" />
        {/* text data */}
        <div className="flex-1">
          <h2 className="font-bold">{expense.title}</h2>
          <div className="flex gap-2 text-sm font-semibold text-gray-400 items-center justify-center">
            <h3>{expense.expenseDate.split("T")[0]}</h3>

            <h3 className=" bg-green-100 p-1 px-2 text-green-500 rounded-sm ">
              {expense.category}
            </h3>
          </div>
        </div>
        {/* amount */}
        <div className="flex justify-center items-center flex-col">
          <h2 className="font-bold text-lg">
            - {formatAmount(expense.amount)}
          </h2>
          <div className="flex gap-6  mt-2">
            <button className="flex items-center gap-1 text-sm font-semibold bg-blue-100 p-1  rounded-sm">
              <MdModeEdit className=" text-blue-500 " />
            </button>
            <button className="flex items-center gap-1 text-sm font-semibold bg-red-100 p-1  rounded-sm">
              <MdDelete className=" text-red-500 " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
