import { useState } from "react";
import ProductEditAndAddPage from "../../components/ui/ProductEditAndAddPage";
import type { editform } from "../../utils/constants";
import { useAddProduct } from "../../services/productService";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../../services/authServices";
import { useQuery } from "@tanstack/react-query";

const AddProducts = () => {
  const [AddData, setAddData] = useState<editform>({
    name: "",
    sellingPrice: 0,
    costPrice: 0,
    stock: 0,
    unit: "",
    description: "",
    category: "",
    isActive: false,
    itemCategory: "",
    image: null,
  });
  const [imageFile, setImageFile] = useState<string | null>(null);

  const handelEditData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      const file = files[0];
      setAddData((prev) => ({
        ...prev,
        image: file,
      }));
      setImageFile(URL.createObjectURL(file));
    } else {
      setAddData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const addProductMutation = useAddProduct();
  //   ckeck auth

  const { data: authData } = useQuery({
    queryKey: ["authShop"],
    queryFn: () => checkAuth(),
  });
  const authShop = authData?.shop?._id;
  console.log("authdata", authData);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("shop", authShop || "");
    formData.append("name", AddData.name);
    formData.append("sellingPrice", AddData.sellingPrice.toString());
    formData.append("costPrice", AddData.costPrice.toString());
    formData.append("stock", AddData.stock.toString());
    formData.append("description", AddData.description);
    formData.append("category", AddData.category);
    formData.append("isActive", AddData.isActive.toString());
    formData.append("itemCategory", AddData.itemCategory);
    if (AddData.image) {
      formData.append("image", AddData.image);
    }
    console.log(formData);

    addProductMutation.mutate(formData);

    // Here you can handle the form submission, e.g., send the updated data to the server
    console.log("Submitting form with data:", AddData);
  };
  const navigate = useNavigate();

  if (addProductMutation.isSuccess) {
    navigate("/products");
  }

  return (
    <ProductEditAndAddPage
      editData={AddData}
      setEditData={setAddData}
      imageFile={imageFile}
      handelEditData={handelEditData}
      submitForm={submitForm}
      componentType="add"
    />
  );
};

export default AddProducts;
