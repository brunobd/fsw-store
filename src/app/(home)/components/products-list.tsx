import ProductItem from "@/components/ui/product-item";
import { computeProductFinalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";

interface ProductsListProps {
  products: Product[]
}

const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <div>
      <h2 className="px-5">Ofertas</h2>
      <div
        className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {products.map(product => <ProductItem key={product.id} product={computeProductFinalPrice(product)} />)}
      </div>
    </div>

  );
}

export default ProductsList