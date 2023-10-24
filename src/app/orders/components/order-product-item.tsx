import { computeProductFinalPrice } from "@/helpers/product"
import { Prisma } from "@prisma/client"
import Image from "next/image"
import React from 'react'
interface OrderProductItemProps {
  orderProduct: Prisma.OrderProductGetPayload<{
    include: {
      product: true
    }
  }>
}

const OrderProductItem = ({ orderProduct }: OrderProductItemProps) => {
  const orderProductWithFinalPrice = computeProductFinalPrice(orderProduct.product)
  return (
    <div className="flex items-center gap-4">
      <div className="bg-accent rounded-lg w-[112px] h-[104px] flex items-center justify-center">
        <Image
          src={orderProduct.product.imageUrls[0]}
          alt={orderProduct.product.name}
          width={0}
          height={0}
          sizes="100xw"
          className="object-contain h-auto w-auto max-h-[80%] max-w-[80%] aspect-square"
        />
      </div>
      <div className="flex w-full flex-col gap-2 justify-between">

        <div className="flex bg-accent rounded-sm items-center py-1 justify-center">
          <p className="text-[10px]">Vendido e entregue por <span className="font-bold">FSW Store</span></p>
        </div>

        <p className="text-xs">{orderProduct.product.name}</p>

        <div className="flex items-center w-full justify-between">
          <div className="flex items-center">
            <p className="font-bold tex-sm">{orderProductWithFinalPrice.finalPrice.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</p>
            {orderProductWithFinalPrice.discountPercentage > 0 && (
              <p className="opacity-60 line-through text-xs">{Number(orderProductWithFinalPrice.basePrice).toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</p>
            )}
          </div>
          <p className="opacity-60 text-xs">Qntd: {orderProduct.quantity}</p>
        </div>

      </div>

    </div>
  )
}

export default OrderProductItem