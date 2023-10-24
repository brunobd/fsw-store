"use server"
import { prismaClient } from "@/lib/prisma"
import { CartProduct } from "@/providers/cart"

const createOrder = async (
  cartProducts: CartProduct[],
  userId: string) => {
  const order = await prismaClient.order.create({
    data: {
      userId,
      status: "PAYMENT_CONFIRMED",
      orderProducts: {
        createMany: {
          data: cartProducts.map((product) => ({
            basePrice: product.basePrice,
            discountPercentage: product.discountPercentage,
            productId: product.id,
            quantity: product.quantity
          }))
        }
      }
    }
  })
  return order
}

export default createOrder