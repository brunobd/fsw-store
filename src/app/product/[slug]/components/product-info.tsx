"use client"
import { Button } from "@/components/ui/button"
import DiscountBadge from "@/components/ui/discount-badge"
import { ProductWithFinalPrice } from "@/helpers/product"
import { CartContext } from "@/providers/cart"
import { Product } from "@prisma/client"
import { ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react"
import { useContext, useState } from "react"

interface ProductInfoProps {
  product: ProductWithFinalPrice
}
const ProductInfo = ({ product }: ProductInfoProps) => {
  const [productQuantity, setProductQuantity] = useState(1)
  const { addProductsToCart } = useContext(CartContext)
  const handleDecreaseProductQuantityClick = () => {
    setProductQuantity((previousState) => (previousState === 1 ? previousState : previousState - 1))
  }
  const handleIncreaseProductQuantityClick = () => {
    setProductQuantity((previousState) => previousState + 1)
  }

  const handleAddProductToCartClick = () => {
    addProductsToCart({
      ...product,
      quantity: productQuantity
    })
  }

  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{product.name}</h2>
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold" >{product.finalPrice.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</h1>
        {product.discountPercentage > 0 && (
          <DiscountBadge>{product.discountPercentage}</DiscountBadge>
        )}
      </div>
      {product.discountPercentage > 0 && (
        <>
          <p className="opacity-75 text-sm">
            De: <span className="line-through opacity-75 text-sm" >{Number(product.basePrice).toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</span>
          </p>
        </>
      )}

      <div className="flex items-center mt-4 gap-4">
        <Button size="icon" variant="outline" onClick={handleDecreaseProductQuantityClick}>
          <ArrowLeftIcon size={14} />
        </Button>
        <span >{productQuantity}</span>
        <Button size="icon" variant="outline" onClick={handleIncreaseProductQuantityClick}>
          <ArrowRightIcon size={14} />
        </Button>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <h3 className="font-bold">Descrição</h3>
        <p className="text-sm opacity-60 text-justify">{product.description}</p>
      </div>
      <Button onClick={handleAddProductToCartClick} className="mt-8 uppercase font-bold"> Adicionar ao carrinho</Button>

      <div className="bg-[#2a2a2a] flex items-center px-5 py-2 mt-5 justify-between rounded-lg">
        <div className="flex items-center gap-2">
          <TruckIcon />
          <div className="flex flex-col">
            <p className=" font-semibold text-xs">Entrega via <span className="font-bold italic">FSPacket®</span></p>
            <p className="font-semibold text-xs text-[#8162FF]" >Envio para <span className="font-bold">todo Brasil</span></p>
          </div>
        </div>
        <p className="font-bold text-xs">Frete Grátis</p>
      </div>
    </div>
  )
}

export default ProductInfo