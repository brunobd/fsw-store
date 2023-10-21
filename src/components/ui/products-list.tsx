import ProductItem from "@/components/ui/product-item";
import { computeProductFinalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";

interface ProductsListProps {
  products: Product[]
}

const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <div
      className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
      {products.map(product => (
        <div key={product.id} className="w-[170px] max-w-[170px]">
          <ProductItem product={computeProductFinalPrice(product)} />
        </div>)
      )}
    </div>
  );
}

export default ProductsList