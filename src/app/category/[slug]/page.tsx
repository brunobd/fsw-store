import { Badge } from "@/components/ui/badge"
import ProductItem from "@/components/ui/product-item"
import { CATEGORY_ICON } from "@/constants/category-icons"
import { computeProductFinalPrice } from "@/helpers/product"
import { prismaClient } from "@/lib/prisma"
import React from 'react'

const CategoryProducts = async ({ params }: any) => {

  const category = await prismaClient.category.findFirst({
    where: {
      slug: params.slug
    },
    include: {
      products: true
    }
  })
  if (!category) {
    return null
  }

  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge className="w-fit gap-1 text-base uppercase border-2 border-primary px-3 py-[0.365rem]" variant="outline">
        {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
        {category?.name}
      </Badge>

      <div className="grid grid-cols-2 gap-8">
        {category?.products.map(product => <ProductItem key={product.id} product={computeProductFinalPrice(product)} />)}
      </div>
    </div>
  )
}

export default CategoryProducts