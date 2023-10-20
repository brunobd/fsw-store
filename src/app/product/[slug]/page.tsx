import { prismaClient } from "@/lib/prisma"
import React from 'react'
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
    <div>
      <h1>
        {product.name}
      </h1>
    </div>
  )
}


export default ProductDetailPage