import { useParams } from "react-router-dom";
import {
  useUpdateProduct,
  ViewProductById,
} from "../../services/productService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import dummyProductImage from "../../assets/dummyProduct.jpg";

const ProductEditPage = () => {
  const param = useParams();
  const { data: product } = useQuery({
    queryKey: ["product", param.productId],
    queryFn: () => ViewProductById(param.productId!),
  });

  const productData = product?.data.productById;
  console.log(productData);
  const [editData, setEditData] = useState({
    name: productData?.name || "",
    sellingPrice: productData?.sellingPrice || 0,
    costPrice: productData?.costPrice || 0,
    stock: productData?.stock || 0,
    unit: productData?.unit || "",
    description: productData?.description || "",
    category: productData?.category || "",
    isActive: productData?.isActive || false,
    itemCategory: productData?.itemCategory || "",
    image: productData?.image || null,
  });
  const [imageFile, setImageFile] = useState<string | undefined>(undefined);

  useEffect(() => {
    setEditData({
      name: productData?.name || "",
      sellingPrice: productData?.sellingPrice || 0,
      costPrice: productData?.costPrice || 0,
      stock: productData?.stock || 0,
      unit: productData?.unit || "",
      description: productData?.description || "",
      category: productData?.category || "",
      isActive: productData?.isActive || false,
      itemCategory: productData?.itemCategory || "",
      image: null,
    });
    setImageFile(productData?.image?.url || null);
  }, [productData]);

  console.log("edit data", editData);

  // handel edit data change
  const handelEditData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      const file = files[0];
      setEditData((prev) => ({
        ...prev,
        image: file,
      }));
      setImageFile(URL.createObjectURL(file));
    } else {
      setEditData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const updateproductMutation = useUpdateProduct();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", editData.name);
    formData.append("sellingPrice", editData.sellingPrice.toString());
    formData.append("costPrice", editData.costPrice.toString());
    formData.append("stock", editData.stock.toString());
    formData.append("unit", editData.unit);
    formData.append("description", editData.description);
    formData.append("category", editData.category);
    formData.append("isActive", editData.isActive.toString());
    formData.append("itemCategory", editData.itemCategory);
    if (editData.image) {
      formData.append("image", editData.image);
    }
    updateproductMutation.mutate({
      productId: param.productId!,
      updatedData: formData,
    });

    // Here you can handle the form submission, e.g., send the updated data to the server
    console.log("Submitting form with data:", editData);
  };
  return (
    <div className="w-full p-4 h-full pb-8 bg-primaryBg flex flex-col gap-4 ">
      {/* heading */}
      <h1 className=" text-xl font-bold ">Edit Product</h1>
      {/* edit form  */}
      <form onSubmit={submitForm} className="w-full">
        <div
          className="flex flex-col justify-center items-center
      gap-5 "
        >
          <img
            className="w-36 rounded-4xl "
            src={imageFile ? imageFile : dummyProductImage}
            alt={editData?.name}
          />
          <div>
            <label
              htmlFor="image"
              className="cursor-pointer text-xl font-semibold"
            >
              Change Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handelEditData}
              className="hidden"
            />
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

export default ProductEditPage;
