import { CartContext, CartProduct } from "@/providers/cart"
import { ArrowLeftIcon, ArrowRightIcon, DeleteIcon, TrashIcon } from "lucide-react"
import Image from "next/image"
import React, { useContext } from 'react'
import { Button } from "./button"

interface CartItemProps {
  product: CartProduct
}

const CartItem = ({ product }: CartItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity, removeProductFromCart } = useContext(CartContext)

  const handleDecreaseProductQuantityClick = () => {
    decreaseProductQuantity(product.id)
  }
  const handleIncreaseProductQuantityClick = () => {
    increaseProductQuantity(product.id)
  }
  const handleRemoveProductFromCartClick = () => {
    removeProductFromCart(product.id)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4" >
        <div className="h-[77px] w-[77px] bg-accent flex items-center justify-center rounded-lg">
          <Image
            alt={product.name}
            src={product.imageUrls[0]}
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-auto max-w-[80%] max-h-[70%]"
            style={{
              objectFit: "contain"
            }}
          />
        </div>

        <div className="flex flex-col ">
          <p className="text-xs">{product.name}</p>
          <div className="flex gap-2 items-center">
            <p className="font-bold text-sm">{product.finalPrice.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</p>
            {product.discountPercentage > 0 && (
              <p className=" line-through text-xs opacity-75">{Number(product.basePrice).toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</p>
            )}

          </div>
          <div className="flex items-center gap-2 mt-1">
            <Button size="icon" variant="outline" className="h-8 w-8" onClick={handleDecreaseProductQuantityClick}>
              <ArrowLeftIcon size={16} />
            </Button>
            <span className="text-xs">{product.quantity}</span>
            <Button size="icon" variant="outline" className="h-8 w-8" onClick={handleIncreaseProductQuantityClick}>
              <ArrowRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Button size="icon" variant="outline" onClick={handleRemoveProductFromCartClick}>
        <TrashIcon size={16} />
      </Button>
    </div>
  )
}

export default CartItem