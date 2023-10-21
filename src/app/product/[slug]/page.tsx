import { prismaClient } from "@/lib/prisma"
import React from 'react'
import ProductImages from "./components/product-images"
import ProductInfo from "./components/product-info"
import { computeProductFinalPrice } from "@/helpers/product"
import ProductsList from "@/components/ui/products-list"
import SectionTitle from "@/components/ui/section-title"
interface ProductDetailPageProps {
  params: {
    slug: string
  }
}

const ProductDetailPage = async ({ params: { slug } }: ProductDetailPageProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug
    },
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug
              }
            }
          }
        }
      }
    }
  })

  if (!product) {
    return null
  }

  return (
    <div className="flex flex-col gap-8 pb-8">
      <ProductImages imageUrls={product.imageUrls} name={product.name} />
      <ProductInfo product={computeProductFinalPrice(product)} />
      <div className="flex flex-col gap-2">
        <SectionTitle>Produtos relacionados</SectionTitle>
        <ProductsList products={product.category.products} />
      </div>
    </div>
  )
}


export default ProductDetailPage