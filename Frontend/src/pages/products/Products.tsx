import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  useUpdateProduct,
  ViewAllProducts,
  ViewProductsCategory,
} from "../../services/productService";
import type { Product } from "../../utils/constants";
import ItemCard from "../../components/ui/ItemCard";
import CategoryTab from "../../components/ui/CategoryTab";
import { useNavigate } from "react-router-dom";
import BillCardSkeleton from "../../components/ui/skeleton/BillCardSkeleton";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { data: products, isLoading: isProductsLoading } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () => ViewAllProducts(selectedCategory),
  });

  const { data: Categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => ViewProductsCategory(),
  });
  const updateProductMutation = useUpdateProduct();
  const toogleProductStatus = (product: Product) => {
    console.log(":::::", product);

    const newStatis = product.isActive ? false : true;
    updateProductMutation.mutate({
      productId: product._id,
      updatedData: { isActive: newStatis },
    });
  };
  const navigate = useNavigate();
  return (
    <div className="px-4 py-6 w-full flex flex-col gap-6">
      {/* add a new product  */}
      <div className=" flex gap-4 justify-start items-center ">
        <h1 className="text-2xl font-bold ">Products</h1>
        <button
          onClick={() => navigate("/products/add")}
          className=" bg-green-100 text-green-500 px-4 py-2 rounded-md "
        >
          {" "}
          Add New Product
        </button>
      </div>
      {/* categories */}
      <CategoryTab
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        Categories={Categories?.data?.data || []}
      />

      {isProductsLoading ? (
        <BillCardSkeleton />
      ) : (
        <div className="p-4 md:p-8 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6">
          {products?.data?.allProducts.map((product: Product) => (
            <ItemCard
              key={product._id}
              product={product}
              card="inventory"
              toogleProductStatus={toogleProductStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
