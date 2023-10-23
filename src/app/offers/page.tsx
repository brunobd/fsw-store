import { Badge } from "@/components/ui/badge"
import ProductItem from "@/components/ui/product-item"
import { computeProductFinalPrice } from "@/helpers/product"
import { prismaClient } from "@/lib/prisma"
import { PercentIcon } from "lucide-react"
import React from 'react'

const OffersPage = async () => {
  const productsOnOffer = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0
      }
    }
  })
  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge className="w-fit gap-1 text-base uppercase border-2 border-primary px-3 py-[0.365rem]" variant="outline">
        <PercentIcon size={16} />
        Ofertas
      </Badge>
      <div className="grid grid-cols-2 gap-8">
        {productsOnOffer.map(product => <ProductItem key={product.id} product={computeProductFinalPrice(product)} />)}
      </div>
    </div>
  )
}

export default OffersPage