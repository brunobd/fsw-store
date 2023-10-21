import { ProductWithFinalPrice } from "@/helpers/product";
import Image from "next/image";
import Link from "next/link";
import DiscountBadge from "./discount-badge";
interface ProductItemProps {
  product: ProductWithFinalPrice
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex flex-col gap-4">
        <div
          className="relative bg-accent rounded-lg h-[170px] w-full flex items-center justify-center"
        >
          {product.discountPercentage > 0 && (
            <DiscountBadge className="absolute top-2 left-2" >{product.discountPercentage}</DiscountBadge>
          )}
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-auto max-w-[70%] max-h-[80%]"
            style={{
              objectFit: "contain"
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">{product.name}</p>
          <div className="flex items-center gap-2">
            {product.discountPercentage > 0 ? (
              <>
                <p className="font-semibold" >{product.finalPrice.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</p>
                <p className="line-through opacity-75 text-xs" >{Number(product.basePrice).toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</p>
              </>
            ) : (
              <>
                <p className="font-semibold text-sm" >{product.finalPrice.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</p>
              </>
            )}
          </div>
        </div>

      </div>
    </Link>
  );
}

export default ProductItem