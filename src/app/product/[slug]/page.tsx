import { prismaClient } from "@/lib/prisma"
import React from 'react'
import ProductImages from "./components/product-images"
import ProductInfo from "./components/product-info"
import { computeProductFinalPrice } from "@/helpers/product"
interface ProductDetailPageProps {
  params: {
    slug: string
  }
}

const ProductDetailPage = async ({ params: { slug } }: ProductDetailPageProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug
    }
  })

  if(!product){
    return null
  }

  return (
    <div className="flex flex-col gap-8">
      <ProductImages imageUrls={product.imageUrls} name={product.name}/>
      <ProductInfo product={computeProductFinalPrice(product)} />
    </div>
  )
}


export default ProductDetailPage