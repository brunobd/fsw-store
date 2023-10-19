import { Product } from "@prisma/client";

interface ProductWithFinalPrice extends Product {
  finalPrice: number;
}
export const computeProductFinalPrice = (product: Product):ProductWithFinalPrice => {
  const finalPrice = Number(product.basePrice) - (Number(product.basePrice) * product.discountPercentage) / 100
  return {
    ...product,
    finalPrice
  }
}