import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProduct,
  useUpdateProduct,
  ViewProductById,
} from "../../services/productService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ProductEditAndAddPage from "../../components/ui/ProductEditAndAddPage";
import type { editform } from "../../utils/constants";

const ProductEditPage = () => {
  const param = useParams();
  const { data: product } = useQuery({
    queryKey: ["product", param.productId],
    queryFn: () => ViewProductById(param.productId!),
  });

  const productData = product?.data.productById;
  console.log(productData);
  const [editData, setEditData] = useState<editform>({
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
  const [imageFile, setImageFile] = useState<string | null>(null);

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

  const navigate = useNavigate();
  if (updateproductMutation.isSuccess) {
    navigate("/products");
  }

  // handel delete product
  const deleteProductMutation = useDeleteProduct();
  const handelDeleteProduct = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProductMutation.mutate(id);
    }
  };
  if (deleteProductMutation.isSuccess) {
    navigate("/products");
  }
  return (
    <ProductEditAndAddPage
      editData={editData}
      setEditData={setEditData}
      imageFile={imageFile}
      handelEditData={handelEditData}
      submitForm={submitForm}
      param={param.productId!}
      componentType="edit"
      handelDeleteProduct={handelDeleteProduct}
    />
  );
};

export default ProductEditPage;
