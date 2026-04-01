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

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { data: products } = useQuery({
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
  return (
    <div className="px-4 py-6 w-full">
      {/* categories */}
      <CategoryTab
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        Categories={Categories?.data?.data || []}
      />

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
    </div>
  );
};

export default Products;
