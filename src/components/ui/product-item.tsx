import { ProductWithFinalPrice } from "@/helpers/product";
import { ArrowDown} from "lucide-react";
import Image from "next/image";
import { Badge } from "./badge";
interface ProductItemProps {
  product: ProductWithFinalPrice
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative bg-accent rounded-lg h-[170px] w-full flex items-center justify-center"
      >
        {product.discountPercentage > 0 && (
          <Badge className="absolute left-2 top-2 px-2 py-[2px]">
            <ArrowDown size={14} /> {product.discountPercentage} % OFF
          </Badge>
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
  );
}

export default ProductItem