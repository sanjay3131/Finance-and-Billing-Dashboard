import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import dummyProductImage from "../../assets/dummyProduct.jpg";
import type { editAndAddProps } from "../../utils/constants";

const ProductEditAndAddPage = ({
  editData,
  setEditData,
  imageFile,
  handelEditData,
  submitForm,
  param,
  componentType,

  handelDeleteProduct,
}: editAndAddProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-full p-4 h-full pb-8 bg-primaryBg flex flex-col gap-4 ">
      {/* heading */}
      <div className="flex gap-4 items-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-white  px-4 py-2 rounded-md inline-flex items-center gap-2 text-sm font-medium hover:bg-gray-100 transition-colors duration-300 "
        >
          <IoMdArrowRoundBack />
          Back
        </button>
        <h1 className=" text-xl font-bold ">Edit Product</h1>
      </div>
      {/* edit form  */}
      <form onSubmit={submitForm} className="w-full">
        <div
          className="flex flex-col justify-center items-center
      gap-5 md:container md:mx-auto md:w-[80%]"
        >
          <img
            className="w-36 rounded-4xl "
            src={imageFile ? imageFile : dummyProductImage}
            alt={editData?.name}
          />
          <div className="flex flex-col gap-4">
            <label
              htmlFor="image"
              className="cursor-pointer text-xl font-semibold"
            >
              {componentType === "add" ? "Upload Image" : "Change Image"}
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handelEditData}
              className="hidden"
            />

            {/* delete button */}
            {componentType === "edit" && param && handelDeleteProduct ? (
              <button
                type="button"
                onClick={() => handelDeleteProduct(param)}
                className="mt-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300"
              >
                Delete Product
              </button>
            ) : null}
          </div>
          {/* product name */}
          <div className=" bg-white w-full p-4  rounded-2xl shadow-md">
            <label htmlFor="productName" className="text-lg font-semibold">
              Product Name
            </label>
            <input
              id="productName"
              type="text"
              className="bg-white  text-xl font-semibold capitalize rounded-xl h-12  border w-full px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={editData?.name}
              name="name"
              onChange={handelEditData}
              placeholder="add product name"
            />
          </div>
          {/* selling price */}
          <div className=" bg-white w-full p-4  rounded-2xl shadow-md">
            <label htmlFor="sellingPrice" className="text-lg font-semibold">
              Selling Price
            </label>
            <input
              id="sellingPrice"
              type="text"
              className="bg-white  text-xl font-semibold capitalize rounded-xl h-12  border w-full px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={editData?.sellingPrice}
              name="sellingPrice"
              onChange={handelEditData}
            />
          </div>
          {/* cost price */}
          <div className=" bg-white w-full p-4  rounded-2xl shadow-md">
            <label htmlFor="costPrice" className="text-lg font-semibold">
              Cost Price
            </label>
            <input
              id="costPrice"
              type="text"
              className="bg-white  text-xl font-semibold capitalize rounded-xl h-12  border w-full px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={editData?.costPrice}
              name="costPrice"
              onChange={handelEditData}
            />
          </div>

          {/* category */}
          <div className=" bg-white w-full p-4  rounded-2xl shadow-md">
            <label htmlFor="category" className="text-lg font-semibold">
              Category
            </label>
            <input
              id="category"
              type="text"
              className="bg-white  text-xl font-semibold capitalize rounded-xl h-12  border w-full px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={editData?.category}
              name="category"
              onChange={handelEditData}
            />
          </div>
          {/* product description */}
          <div className=" bg-white w-full p-4  rounded-2xl shadow-md">
            <label htmlFor="description" className="text-lg font-semibold">
              Description
            </label>
            <input
              id="description"
              type="text"
              className="bg-white  text-xl font-semibold capitalize rounded-xl h-12  border w-full px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={editData?.description}
              name="description"
              onChange={handelEditData}
            />
          </div>
          {/* product category */}
          <div className=" bg-white w-full p-4  rounded-2xl shadow-md">
            <label htmlFor="itemCategory" className="text-lg font-semibold">
              Item Category
            </label>
            <input
              id="itemCategory"
              type="text"
              className="bg-white  text-xl font-semibold capitalize rounded-xl h-12  border w-full px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={editData?.itemCategory}
              name="itemCategory"
              onChange={handelEditData}
            />
          </div>
          {/* isActive */}
          <div className=" bg-white w-full p-4  rounded-2xl shadow-md flex items-center gap-4">
            <label htmlFor="isActive" className="text-lg font-semibold">
              Is Active
            </label>
            <input
              id="isActive"
              type="checkbox"
              className="ml-2 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={editData?.isActive}
              name="isActive"
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  isActive: e.target.checked,
                }))
              }
            />
          </div>
          {/* submit  */}
          <button
            type="submit"
            onClick={() => submitForm}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors duration-300 "
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEditAndAddPage;
