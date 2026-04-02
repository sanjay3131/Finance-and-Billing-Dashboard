import { useParams } from "react-router-dom";
import { ViewProductById } from "../../services/productService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const ProductEditPage = () => {
  const param = useParams();
  const { data: product } = useQuery({
    queryKey: ["product", param.productId],
    queryFn: () => ViewProductById(param.productId!),
  });
  const productData = product?.data.productById;
  console.log(productData);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [editData, setEditData] = useState({
    // name,
    // image: imageData,
    // category,
    // costPrice,
    // sellingPrice,
    // stock,
    // unit,
    // description,
    // itemCategory,
    // isActive,
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
  console.log("edit data", editData);

  return (
    <div className="w-full p-4 bg-primaryBg flex flex-col gap-4">
      <h1 className=" text-xl font-bold ">Edit Product</h1>

      <div
        className="flex flex-col justify-center items-center
      gap-5 "
      >
        <img
          className="w-36 rounded-4xl "
          src={productData?.image?.url}
          alt={productData?.name}
        />
        <input
          type="text"
          className="bg-white text-center text-xl font-semibold capitalize rounded-2xl h-12 w-fit"
          value={productData?.name}
          name="name"
        />{" "}
        <input type="text" className="" value={productData?.sellingPrice} />
      </div>
    </div>
  );
};

export default ProductEditPage;
